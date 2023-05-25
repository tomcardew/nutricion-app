import { AuthStore } from "../../../../../store/AuthStore";
import { PatientsStore } from "../../../../../store/PatientsStore";

class PatientExerciseCommentsViewModel {
  navigation: any;
  authStore: AuthStore;
  patientsStore: PatientsStore;

  constructor(navigation: any, authStore: AuthStore, patientsStore: PatientsStore) {
    this.navigation = navigation;
    this.authStore = authStore;
    this.patientsStore = patientsStore;
  }

  onChangeText = (nextValue: string) => {
    this.patientsStore.commentTextPrompt = nextValue
  }

  didPressSend = () => {
    this.patientsStore.addComment(this.authStore.token ?? '', this.authStore.user?.esAdministrador ?? false)
  }

  dismiss = () => {
    this.patientsStore.alert = null;
  }

  goBack = () => {
    this.navigation.goBack();
  };
}

export default PatientExerciseCommentsViewModel;
