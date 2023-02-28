import {AlertType} from '../../../../../../models/Common';
import {AuthStore} from '../../../../../store/AuthStore';
import {PatientsStore} from '../../../../../store/PatientsStore';

class PatientDataEditorViewModel {
  authStore: AuthStore;
  patientsStore: PatientsStore;
  navigation: any;

  constructor(
    authStore: AuthStore,
    patientsStore: PatientsStore,
    navigation: any,
  ) {
    this.authStore = authStore;
    this.patientsStore = patientsStore;
    this.navigation = navigation;
  }

  didChangeWeight = (value: string) => {
    this.patientsStore.data_weight = value;
  };

  didChangeImc = (value: string) => {
    this.patientsStore.data_imc = value;
  };

  didChangeBodyFat = (value: string) => {
    this.patientsStore.data_bodyFat = value;
  };

  didChangeWaist = (value: string) => {
    this.patientsStore.data_waist = value;
  };

  didChangeAbdomen = (value: string) => {
    this.patientsStore.data_abdomen = value;
  };

  didChangeHip = (value: string) => {
    this.patientsStore.data_hip = value;
  };

  didPressSaveProgress = async () => {
    await this.patientsStore.savePatientProgress(this.authStore.token ?? '');
  };

  dismissAlert = () => {
    if (this.patientsStore.alert?.type === AlertType.Success) {
      this.patientsStore.cleanPatientProgress();
      this.goBack();
    }
    this.patientsStore.alert = null;
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default PatientDataEditorViewModel;
