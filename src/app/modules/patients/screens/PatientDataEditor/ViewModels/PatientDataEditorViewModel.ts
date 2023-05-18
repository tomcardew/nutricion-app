import {IndexPath} from '@ui-kitten/components';
import {AlertType} from '../../../../../../models/Common';
import {AuthStore} from '../../../../../store/AuthStore';
import {PatientsStore} from '../../../../../store/PatientsStore';
import {PatientProgresCategories} from '../../../../../../models/Patients';
import {Logger} from '../../../../../../utils/Utils';

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

  didChangeCategory = (path?: IndexPath | IndexPath[]) => {
    const options = [
      PatientProgresCategories.PLIEGUES,
      PatientProgresCategories.PERIMETROS,
      PatientProgresCategories.RESULTADOS,
    ];
    if (Array.isArray(path)) {
      this.patientsStore.currentProgressCategory = path[0];
      this.patientsStore.selectedProgressCategory = options[path[0].row];
    } else {
      this.patientsStore.currentProgressCategory = path;
      this.patientsStore.selectedProgressCategory = options[path?.row ?? 0];
    }
  };

  didChangeValue = (value: string, key: string) => {
    // eslint-disable-next-line
    this.patientsStore.dataPatientProgress[key] = value;
    this.patientsStore.reloader = !this.patientsStore.reloader;
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
