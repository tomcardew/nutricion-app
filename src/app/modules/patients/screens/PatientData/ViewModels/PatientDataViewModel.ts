import ScreenNames from '../../../../../../constants/Screens';
import {AlertMessage} from '../../../../../../models/Common';
import {AuthStore} from '../../../../../store/AuthStore';
import {PatientsStore} from '../../../../../store/PatientsStore';

class PatientDataViewModel {
  authStore: AuthStore;
  patientsStore: PatientsStore;
  navigation: any;

  alert: AlertMessage | null = null;

  constructor(
    authStore: AuthStore,
    patientsStore: PatientsStore,
    navigation: any,
  ) {
    this.authStore = authStore;
    this.patientsStore = patientsStore;
    this.navigation = navigation;
  }

  load = async () => {
    await this.patientsStore.getPatientProgress(this.authStore.token ?? '');
    await this.patientsStore.getPatientSteps(this.authStore.token ?? '');
  };

  didPressEditData = () => {
    this.navigation.navigate(ScreenNames.PatientDataEditor.toString());
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default PatientDataViewModel;
