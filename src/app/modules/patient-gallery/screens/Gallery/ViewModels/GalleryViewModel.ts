import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {AuthStore} from '../../../../../store/AuthStore';
import {PatientsStore} from '../../../../../store/PatientsStore';
import {GalleryCategory} from '../../../../../../models/Common';

class GalleryViewModel {
  navigation: any;
  authStore: AuthStore;
  patientsStore: PatientsStore;

  constructor(
    navigation: any,
    authStore: AuthStore,
    patientsStore: PatientsStore,
  ) {
    this.navigation = navigation;
    this.authStore = authStore;
    this.patientsStore = patientsStore;
  }

  load = async (refreshing: boolean = false) => {
    await this.patientsStore.getActivityPictures(
      this.authStore.token ?? '',
      refreshing,
    );
  };

  didPressAddPicture = () => {
    this.patientsStore.showPostActivityPicture(false, source => {
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
          await this.postActivityPicture(
            result.assets[0],
            GalleryCategory.Activities,
          );
        }
        this.dismissAlert();
      };
      launch();
    });
  };

  postActivityPicture = async (asset: Asset, category: GalleryCategory) => {
    const data = await this.patientsStore.postActivityPicture(
      this.authStore.token ?? '',
      asset,
      category,
    );
    if (data.success) {
      this.load(true);
      this.didChangeCategory(GalleryCategory.Activities);
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

export default GalleryViewModel;
