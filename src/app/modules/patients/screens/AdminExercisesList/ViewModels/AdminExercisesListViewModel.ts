import { AuthStore } from "../../../../../store/AuthStore";
import { PatientsStore } from "../../../../../store/PatientsStore";
import ScreenNames from "../../../../../../constants/Screens";
import { Exercise } from "../../../../../../models/Catalogues";
import { PatientExerciseListItem } from "../../../../../../models/Patients";
import moment from "moment";

class AdminExercisesListViewModel {
  navigation: any;
  authStore: AuthStore;
  patientsStore: PatientsStore;

  constructor(
    authStore: AuthStore,
    patientsStore: PatientsStore,
    navigation: any
  ) {
    this.navigation = navigation;
    this.authStore = authStore;
    this.patientsStore = patientsStore;
  }

  load = async () => {
    await this.patientsStore.getAdminExercises(this.authStore.token ?? "");
  };

  goToAddExercise = () => {
    this.navigation.navigate(ScreenNames.AdminExercises.toString());
  };

  goToExerciseDetails = (exercise: PatientExerciseListItem) => {
    this.patientsStore.selectedAdminExercise = exercise;
    this.navigation.navigate(ScreenNames.AdminExerciseDetails.toString(), {
      exercise,
    });
  };

  didChangeDate = (date: Date) => {
    this.patientsStore.currentDate = date;
    this.patientsStore.getAdminExercises(this.authStore.token ?? "");
  };

  didChangeDateString = (dateString: string) => {
    this.patientsStore.currentDate = moment(dateString, "YYYY/MM/DD").toDate();
    this.didChangeDate(this.patientsStore.currentDate);
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default AdminExercisesListViewModel;
