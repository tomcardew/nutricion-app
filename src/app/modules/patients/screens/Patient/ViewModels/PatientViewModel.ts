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
  };

  navigateTo = (screen: ScreenNames, props?: any) => {
    this.navigation.navigate(screen.toString(), props);
  };

  toggleExercises = async () => {
    await this.patientsStore.toggleExercises(this.authStore.token ?? '');
  };

  goBack = () => {
    this.navigation.goBack(ScreenNames.Patients.toString());
  };
}

export default PatientViewModel;
