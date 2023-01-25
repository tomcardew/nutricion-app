import {useNavigation} from '@react-navigation/native';
import {AlertMessage} from '../../../../../../components/Layout/BaseLayoutView';
import ScreenNames from '../../../../../../constants/Screens';
import {PatientsStore} from '../../../../../store/patients/PatientsStore';
import {AuthStore} from '../../../../../store/AuthStore';

class PatientsViewModel {
  authStore: AuthStore;
  patientsStore: PatientsStore;
  navigation: any;

  alert: AlertMessage | null = null;

  constructor(patientsStore: PatientsStore, authStore: AuthStore) {
    this.patientsStore = patientsStore;
    this.authStore = authStore;
    this.navigation = useNavigation();
  }

  load = async () => {
    await this.patientsStore.getPatients(this.authStore.token);
  };

  goToPatient = (id: string) => {
    this.patientsStore.setSelectedPatientWith(id);
    this.navigation.navigate(ScreenNames.Patient.toString());
  };
}

export default PatientsViewModel;
