import {
  launchCamera,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';
import {AlertMessage, GalleryCategory} from '../../../../../../models/Common';
import {AuthStore} from '../../../../../store/AuthStore';
import {PatientsStore} from '../../../../../store/PatientsStore';

class PatientGalleryViewModel {
  authStore: AuthStore;
  patientsStore: PatientsStore;
  navigation: any;

  alert: AlertMessage | null = null;

  constructor(
    patientsStore: PatientsStore,
    authStore: AuthStore,
    navigation: any,
  ) {
    this.patientsStore = patientsStore;
    this.authStore = authStore;
    this.navigation = navigation;
  }

  load = async (refreshing: boolean = false) => {
    await this.patientsStore.getPatientPictures(
      this.authStore.token ?? '',
      refreshing,
    );
  };

  didPressAddPicture = () => {
    this.patientsStore.showPostActivityPicture(true, source => {
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
          await this.postActivityPicture(result.assets[0]);
        }
        this.dismissAlert();
      };
      launch();
    });
  };

  postActivityPicture = async (asset: Asset) => {
    const data = await this.patientsStore.postPatientActivityPicture(
      this.authStore.token ?? '',
      asset,
    );
    if (data.success) {
      this.load(true);
    }
  };

  didChangeCategory = (category: GalleryCategory) => {
    this.patientsStore.selectedGalleryCategory = category;
  };

  public dismissAlert = () => {
    this.patientsStore.alert = null;
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default PatientGalleryViewModel;
