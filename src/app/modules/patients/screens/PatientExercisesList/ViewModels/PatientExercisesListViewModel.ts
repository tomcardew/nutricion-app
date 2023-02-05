import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStore} from '../../../../../store/AuthStore';
import {PatientsStore} from '../../../../../store/patients/PatientsStore';

class PatientExercisesListViewModel {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
  authStore: AuthStore;
  patientsStore: PatientsStore;

  constructor(authStore: AuthStore, patientsStore: PatientsStore) {
    this.navigation = useNavigation();
    this.authStore = authStore;
    this.patientsStore = patientsStore;
  }

  goBack = () => {
    this.navigation.goBack();
  };
}

export default PatientExercisesListViewModel;
