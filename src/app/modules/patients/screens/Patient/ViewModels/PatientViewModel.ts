import {useNavigation} from '@react-navigation/native';
import {AlertMessage} from '../../../../../../components/Layout/BaseLayoutView';
import ScreenNames from '../../../../../../constants/Screens';
import {PatientsStore} from '../../../../../store/patients/PatientsStore';

class PatientViewModel {
  patientsStore: PatientsStore;
  navigation: any;

  alert: AlertMessage | null = null;

  constructor(patientsStore: PatientsStore) {
    this.patientsStore = patientsStore;
    this.navigation = useNavigation();
    console.log(this.navigation);
  }

  goBack = () => {
    this.navigation.goBack();
  };
}

export default PatientViewModel;
