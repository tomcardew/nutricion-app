import {useNavigation} from '@react-navigation/native';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {UserType} from '../../../../../../models/Common';
import {Logger} from '../../../../../../utils/Utils';
import {AuthStore} from '../../../../../store/AuthStore';
import {ProfileStore} from '../../../../../store/ProfileStore';

class ProfileViewModel {
  authStore: AuthStore;
  profileStore: ProfileStore;
  navigation: any;

  constructor(authStore: AuthStore, profileStore: ProfileStore) {
    this.navigation = useNavigation();
    this.authStore = authStore;
    this.profileStore = profileStore;
  }

  load = async () => {
    const data = await this.profileStore.getProfile(
      this.authStore.token ?? '',
      UserType.Patient,
    );
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
      UserType.Patient,
    );
    if (data.success) {
      const data = await this.profileStore.getProfile(
        this.authStore.token ?? '',
        UserType.Patient,
      );
      this.authStore.setUser(data.data.profile);
    }
  };

  dismissAlert = () => {
    this.profileStore.dismiss();
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default ProfileViewModel;
