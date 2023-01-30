import {useNavigation} from '@react-navigation/native';

class PatientGalleryViewModel {
  navigation: any;

  constructor() {
    this.navigation = useNavigation();
  }

  goBack = () => {
    this.navigation.goBack();
  };
}

export default PatientGalleryViewModel;
