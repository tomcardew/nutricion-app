import {useNavigation} from '@react-navigation/native';
import {AuthStore} from '../../../../../store/AuthStore';
import {PatientsStore} from '../../../../../store/patients/PatientsStore';
import {AlertMessage} from '../../../../../../components/Layout/BaseLayoutView';

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

  goBack = () => {
    this.navigation.goBack();
  };
}

export default PatientGalleryViewModel;
