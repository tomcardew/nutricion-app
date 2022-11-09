import {AuthStore} from '../../../../../store/AuthStore';
import {useNavigation} from '@react-navigation/native';
import {AlertMessage} from '../../../../../../components/Layout/BaseLayoutView';
import {ProfileStore} from '../../../../../store/profile/ProfileStore';

class ProfileViewModel {
  authStore: AuthStore;
  profileStore: ProfileStore;
  navigation: any;

  alert: AlertMessage | null = null;

  constructor(authStore: AuthStore, profileStore: ProfileStore) {
    this.authStore = authStore;
    this.profileStore = profileStore;
    this.navigation = useNavigation();
  }

  showEditingOptions = () => {
    this.profileStore.showAlert(() => {
      this.authStore.logout();
      this.dismissAlert();
    });
  };

  dismissAlert = () => {
    this.profileStore.dismiss();
  };
}

export default ProfileViewModel;
