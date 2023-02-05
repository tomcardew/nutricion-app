import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStore} from '../../../../../store/AuthStore';
import {PatientsStore} from '../../../../../store/patients/PatientsStore';
import ScreenNames from '../../../../../../constants/Screens';

class PatientExercisesListViewModel {
  navigation: any;
  authStore: AuthStore;
  patientsStore: PatientsStore;

  constructor(
    authStore: AuthStore,
    patientsStore: PatientsStore,
    navigation: any,
  ) {
    this.navigation = navigation;
    this.authStore = authStore;
    this.patientsStore = patientsStore;
  }

  load = async () => {
    await this.patientsStore.getPatientExercises(this.authStore.token ?? '');
  };

  goToAddExercise = () => {
    this.navigation.navigate(ScreenNames.PatientExercises.toString());
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default PatientExercisesListViewModel;
