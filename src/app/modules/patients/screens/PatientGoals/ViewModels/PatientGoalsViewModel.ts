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

  goBack = () => {
    this.navigation.goBack();
  };
}

export default PatientGoalsViewModel;
