import ScreenNames from '../../../../../../constants/Screens';
import {PatientsStore} from '../../../../../store/PatientsStore';
import {AuthStore} from '../../../../../store/AuthStore';
import {AlertMessage, PatientsCategory} from '../../../../../../models/Common';

class PatientsViewModel {
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
    await this.patientsStore.getPatients(this.authStore.token);
  };

  goToPatient = (id: string) => {
    this.patientsStore.setSelectedPatientWith(id);
    this.navigation.navigate(ScreenNames.Patient.toString());
  };

  didChangeQuery = (query: string) => {
    this.patientsStore.setQuery(query);
  };

  didPressCategory = (category: PatientsCategory) => {
    this.patientsStore.selectedPatientsList = category;
  };
}

export default PatientsViewModel;
