import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStore} from '../../../../../store/AuthStore';
import {PatientsStore} from '../../../../../store/PatientsStore';
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

  didChangeDate = (date: Date) => {
    this.patientsStore.currentDate = date;
    this.patientsStore.getPatientExercises(this.authStore.token ?? '');
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default PatientExercisesListViewModel;
