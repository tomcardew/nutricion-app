import { PatientObjective } from "../../../../../../models/Patients";
import { AuthStore } from "../../../../../store/AuthStore";
import { PatientsStore } from "../../../../../store/PatientsStore";

class PatientGoalsViewModel {
  navigation: any;
  authStore: AuthStore;
  patientsStore: PatientsStore;

  constructor(
    navigation: any,
    authStore: AuthStore,
    patientsStore: PatientsStore
  ) {
    this.navigation = navigation;
    this.authStore = authStore;
    this.patientsStore = patientsStore;
  }

  load = async () => {
    await this.patientsStore.getPatientObjectives(this.authStore.token ?? "");
  };

  addNewObjective = () => {
    this.patientsStore.showAddObjectiveAlert(this.authStore.token ?? "");
  };

  onMarkCompleted = (id: number) => {
    this.patientsStore.showObjectiveCompletionAlert(
      this.authStore.token ?? "",
      id
    );
  };

  onLongPress = (objective: PatientObjective) => {
    this.patientsStore.showObjectiveOptionsAlert(
      this.authStore.token ?? "",
      objective
    );
  };

  dismissAlert = () => {
    this.patientsStore.alert = null;
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default PatientGoalsViewModel;
