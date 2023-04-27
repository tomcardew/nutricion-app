import {Logger} from '../../../../../../utils/Utils';
import {AuthStore} from '../../../../../store/AuthStore';
import {PatientsStore} from '../../../../../store/PatientsStore';

class AdminExerciseDetailsViewModel {
  navigation: any;
  authStore: AuthStore;
  patientsStore: PatientsStore;

  constructor(
    navigation: any,
    patientsStore: PatientsStore,
    authStore: AuthStore,
  ) {
    this.navigation = navigation;
    this.patientsStore = patientsStore;
    this.authStore = authStore;
  }

  didPressComplete = () => {
    this.patientsStore.showExerciseCompletionAlert(
      this.authStore.token ?? '',
      this.patientsStore.selectedAdminExercise?.id ?? 0,
    );
  };

  getExerciseImage = async () => {
    await this.patientsStore.getExerciseImage();
  };

  dismissAlert = () => {
    this.patientsStore.alert = null;
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default AdminExerciseDetailsViewModel;
