import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {AlertMessage} from '../../../../../../components/Layout/BaseLayoutView';
import {AuthStore} from '../../../../../store/AuthStore';
import {PatientsStore} from '../../../../../store/patients/PatientsStore';

class PatientDataViewModel {
  authStore: AuthStore;
  patientsStore: PatientsStore;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
  route: any;

  alert: AlertMessage | null = null;

  constructor(authStore: AuthStore, patientsStore: PatientsStore) {
    this.authStore = authStore;
    this.patientsStore = patientsStore;
    this.navigation = useNavigation();
    this.route = useRoute();
  }

  load = async () => {
    await this.patientsStore.getPatientProgress(this.authStore.token ?? '');
  };

  goBack = () => {
    console.log();
    this.navigation.goBack();
  };
}

export default PatientDataViewModel;
