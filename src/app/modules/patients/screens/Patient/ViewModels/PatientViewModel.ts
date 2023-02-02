import {useNavigation} from '@react-navigation/native';
import {AlertMessage} from '../../../../../../components/Layout/BaseLayoutView';
import {PatientsStore} from '../../../../../store/patients/PatientsStore';
import {AuthStore} from '../../../../../store/AuthStore';
import ScreenNames from '../../../../../../constants/Screens';

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
