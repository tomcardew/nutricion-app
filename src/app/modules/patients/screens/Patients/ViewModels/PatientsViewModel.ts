import {useNavigation} from '@react-navigation/native';
import {AlertMessage} from '../../../../../../components/Layout/BaseLayoutView';
import ScreenNames from '../../../../../../constants/Screens';
import {PatientsStore} from '../../../../../store/patients/PatientsStore';

class PatientsViewModel {
  patientsStore: PatientsStore;
  navigation: any;

  alert: AlertMessage | null = null;

  constructor(patientsStore: PatientsStore) {
    this.patientsStore = patientsStore;
    this.navigation = useNavigation();
  }

  goToPatient = (id: number) => {
    this.patientsStore.setSelectedPatientWith(id);
    this.navigation.navigate(ScreenNames.Patient.toString());
  };
}

export default PatientsViewModel;
