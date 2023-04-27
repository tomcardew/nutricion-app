import {useRoute} from '@react-navigation/native';
import {Logger} from '../../../../../../utils/Utils';
import {PatientsStore} from '../../../../../store/PatientsStore';

class AdminExerciseDetailsViewModel {
  navigation: any;
  patientsStore: PatientsStore;
  route: any;

  constructor(navigation: any, patientsStore: PatientsStore) {
    this.navigation = navigation;
    this.patientsStore = patientsStore;
  }

  getExerciseImage = async () => {
    Logger.warn('Calling getExerciseImage');
    await this.patientsStore.getExerciseImage();
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default AdminExerciseDetailsViewModel;
