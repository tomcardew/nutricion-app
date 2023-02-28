import {useNavigation} from '@react-navigation/native';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';
import {AlertMessage, UserType} from '../../../../../../models/Common';
import {Logger} from '../../../../../../utils/Utils';
import {AuthStore} from '../../../../../store/AuthStore';
import {ProfileStore} from '../../../../../store/ProfileStore';

class ProfileViewModel {
  authStore: AuthStore;
  profileStore: ProfileStore;
  navigation: any;
  isAdmin: boolean;

  alert: AlertMessage | null = null;

  constructor(authStore: AuthStore, profileStore: ProfileStore) {
    this.authStore = authStore;
    this.profileStore = profileStore;
    this.navigation = useNavigation();
    this.isAdmin = this.authStore.user?.esAdministrador ?? false;
  }

  load = async () => {
    Logger.warn('Loading profile...');
    const data = await this.profileStore.getProfile(
      this.authStore.token ?? '',
      this.isAdmin ? UserType.Admin : UserType.Patient,
    );
    Logger.success('Retreived profile:', data);
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
      this.isAdmin ? UserType.Admin : UserType.Patient,
    );
    if (data.success) {
      const data = await this.profileStore.getProfile(
        this.authStore.token ?? '',
        this.isAdmin ? UserType.Admin : UserType.Patient,
      );
      this.authStore.setUser(data.data.profile);
    }
  };

  dismissAlert = () => {
    this.profileStore.dismiss();
  };
}

export default ProfileViewModel;
