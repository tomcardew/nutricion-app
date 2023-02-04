import {AuthStore} from '../../../../../store/AuthStore';
import {useNavigation} from '@react-navigation/native';
import {ProfileStore} from '../../../../../store/profile/ProfileStore';
import {AlertMessage} from '../../../../../../models/Common';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';

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

  load = async () => {
    const data = await this.profileStore.getProfile(this.authStore.token ?? '');
    this.authStore.setUser(data.data.profile);
  };

  showEditingOptions = () => {
    this.profileStore.showAlert(
      () => {
        this.authStore.logout();
        this.dismissAlert();
      },
      source => {
        const launch = async () => {
          let result;
          switch (source) {
            case 'camera':
              result = await launchCamera({
                mediaType: 'photo',
                quality: 0.6,
                includeBase64: true,
                saveToPhotos: true,
              });
              break;
            case 'library':
              result = await launchImageLibrary({
                mediaType: 'photo',
                quality: 0.6,
                includeBase64: true,
              });
              break;
          }
          if (result.assets) {
            await this.changeProfilePicture(result.assets[0]);
          }
          this.dismissAlert();
        };
        launch();
      },
    );
  };

  changeProfilePicture = async (asset: Asset) => {
    const data = await this.profileStore.changeProfilePicture(
      this.authStore.token ?? '',
      asset,
    );
    if (data.success) {
      const data = await this.profileStore.getProfile(
        this.authStore.token ?? '',
      );
      this.authStore.setUser(data.data.profile);
    }
  };

  dismissAlert = () => {
    this.profileStore.dismiss();
  };
}

export default ProfileViewModel;
