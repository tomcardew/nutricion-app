import {UserType} from '../../../../../../models/Common';
import {Logger} from '../../../../../../utils/Utils';
import {AuthStore} from '../../../../../store/AuthStore';
import {ProfileStore} from '../../../../../store/ProfileStore';

class PatientProgressViewModel {
  authStore: AuthStore;
  profileStore: ProfileStore;
  navigation: any;

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
    const profile = await this.profileStore.getProfile(
      this.authStore.token ?? '',
      UserType.Patient,
    );
    this.authStore.setUser(profile.data.profile);
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default PatientProgressViewModel;
