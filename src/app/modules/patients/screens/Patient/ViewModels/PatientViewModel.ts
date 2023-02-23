import {PatientsStore} from '../../../../../store/PatientsStore';
import {AuthStore} from '../../../../../store/AuthStore';
import ScreenNames from '../../../../../../constants/Screens';
import {AlertMessage} from '../../../../../../models/Common';

class PatientViewModel {
  authStore: AuthStore;
  patientsStore: PatientsStore;
  navigation: any;

  alert: AlertMessage | null = null;

  constructor(
    patientsStore: PatientsStore,
    authStore: AuthStore,
    navigation: any,
  ) {
    this.patientsStore = patientsStore;
    this.authStore = authStore;
    this.navigation = navigation;
  }

  load = async () => {
    await this.patientsStore.getPatientById(this.authStore.token ?? '');
  };

  unload = () => {
    this.patientsStore.selectedPatient = null;
    this.patientsStore.selectedPatientId = null;
  };

  navigateTo = (screen: ScreenNames, props?: any) => {
    this.navigation.navigate(screen.toString(), props);
  };

  toggleExercises = async () => {
    await this.patientsStore.toggleExercises(this.authStore.token ?? '');
  };

  toggleAccess = async (toValue: boolean) => {
    if (toValue) {
      this.patientsStore.showToggleEnableAccessAlert(this.toggleAccessCall);
    } else {
      this.patientsStore.showToggleDisableAccessAlert(this.toggleAccessCall);
    }
  };

  toggleAccessCall = async () => {
    this.dismissAlert();
    await this.patientsStore.toggleAccess(this.authStore.token ?? '');
    await this.load();
  };

  dismissAlert = () => {
    this.patientsStore.alert = null;
  };

  goBack = () => {
    this.dismissAlert();
    this.navigation.goBack(ScreenNames.Patients.toString());
  };
}

export default PatientViewModel;
