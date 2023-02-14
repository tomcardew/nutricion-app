import {AuthStore} from '../../../../../store/AuthStore';
import {PatientExercisesStore} from '../../../../../store/PatientExercisesStore';

class PatientExercisesViewModel {
  navigation: any;
  authStore: AuthStore;
  patientExercisesStore: PatientExercisesStore;

  constructor(
    navigation: any,
    authStore: AuthStore,
    patientExercisesStore: PatientExercisesStore,
  ) {
    this.navigation = navigation;
    this.authStore = authStore;
    this.patientExercisesStore = patientExercisesStore;
  }

  goBack = () => {
    this.navigation.goBack();
  };
}

export default PatientExercisesViewModel;
