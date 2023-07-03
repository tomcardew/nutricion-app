import { AuthStore } from "../../../../../store/AuthStore";
import { ProfileStore } from "../../../../../store/ProfileStore";

class SinglePatientGoalsViewModel {
  navigation: any;
  authStore: AuthStore;
  profileStore: ProfileStore;

  constructor(
    navigation: any,
    authStore: AuthStore,
    profileStore: ProfileStore
  ) {
    this.navigation = navigation;
    this.authStore = authStore;
    this.profileStore = profileStore;
  }

  load = async () => {
    this.profileStore.getObjectives(this.authStore.token ?? "");
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default SinglePatientGoalsViewModel;
