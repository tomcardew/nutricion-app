import ScreenNames from '../../../../../../constants/Screens';
import {PatientExerciseListItem} from '../../../../../../models/Patients';
import {AuthStore} from '../../../../../store/AuthStore';
import {PatientsStore} from '../../../../../store/PatientsStore';

class PatientExercisesViewModel {
  navigation: any;
  authStore: AuthStore;
  patientsStore: PatientsStore;

  constructor(
    navigation: any,
    authStore: AuthStore,
    patientsStore: PatientsStore,
  ) {
    this.navigation = navigation;
    this.authStore = authStore;
    this.patientsStore = patientsStore;
  }

  load = async () => {
    await this.patientsStore.getPatientExercises(
      this.authStore.token ?? '',
      new Date(),
    );
  };

  didChangeDate = async (date: Date) => {
    await this.patientsStore.getPatientExercises(
      this.authStore.token ?? '',
      date,
    );
  };

  markExerciseAsCompleted = async (id: number) => {
    const success = await this.patientsStore.markExerciseAsCompleted(
      this.authStore.token ?? '',
      id,
    );
    if (success) {
      await this.didChangeDate(new Date());
    }
  };

  didSelectExercise = (exercise: PatientExerciseListItem) => {
    this.patientsStore.selectedAdminExercise = exercise;
    this.navigation.navigate(ScreenNames.AdminExerciseDetails.toString());
  };

  dismissAlert = () => {
    this.patientsStore.alert = null;
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default PatientExercisesViewModel;
