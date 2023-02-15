import {AuthStore} from '../../../../../store/AuthStore';
import {PatientsStore} from '../../../../../store/PatientsStore';
import ScreenNames from '../../../../../../constants/Screens';

class AdminExercisesListViewModel {
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
    await this.patientsStore.getAdminExercises(this.authStore.token ?? '');
  };

  goToAddExercise = () => {
    this.navigation.navigate(ScreenNames.AdminExercises.toString());
  };

  didChangeDate = (date: Date) => {
    this.patientsStore.currentDate = date;
    this.patientsStore.getAdminExercises(this.authStore.token ?? '');
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default AdminExercisesListViewModel;
