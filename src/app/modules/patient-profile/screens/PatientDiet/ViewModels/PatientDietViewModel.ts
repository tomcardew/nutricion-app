import {AlertActionType, AlertType} from '../../../../../../models/Common';
import {Logger} from '../../../../../../utils/Utils';
import {AuthStore} from '../../../../../store/AuthStore';
import {ProfileStore} from '../../../../../store/ProfileStore';

class PatientDietViewModel {
  navigation: any;
  authStore: AuthStore;
  profileStore: ProfileStore;

  constructor(
    navigation: any,
    authStore: AuthStore,
    profileStore: ProfileStore,
  ) {
    this.navigation = navigation;
    this.authStore = authStore;
    this.profileStore = profileStore;
  }

  load = async () => {
    await this.profileStore.getDiet(this.authStore.token ?? '');
  };

  onError = (error: any) => {
    Logger.error(error);
    this.profileStore.showDietError(() => {
      this.profileStore.dismiss();
      this.load();
    });
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default PatientDietViewModel;
