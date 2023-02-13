import {NavigationProp, useNavigation} from '@react-navigation/native';
import {IndexPath} from '@ui-kitten/components';
import {AlertType} from '../../../../../../models/Common';
import {AuthStore} from '../../../../../store/AuthStore';
import {PatientsStore} from '../../../../../store/PatientsStore';

class PatientExercisesViewModel {
  authStore: AuthStore;
  patientsStore: PatientsStore;
  navigation: NavigationProp<ReactNavigation.RootParamList>;

  constructor(authStore: AuthStore, patientsStore: PatientsStore) {
    this.authStore = authStore;
    this.patientsStore = patientsStore;
    this.navigation = useNavigation();
  }

  load = async () => {
    await this.patientsStore.getExerciseCategories(this.authStore.token ?? '');
    await this.patientsStore.getSeries(this.authStore.token ?? '');
    await this.patientsStore.getRepetitions(this.authStore.token ?? '');
    await this.patientsStore.getRest(this.authStore.token ?? '');
  };

  didChangeCategory = (path: IndexPath | IndexPath[]) => {
    const oldCategory = this.patientsStore.currentCategory;
    if (Array.isArray(path)) {
      this.patientsStore.setCurrentCategory(path[0]);
    } else {
      this.patientsStore.setCurrentCategory(path);
    }
    if (
      this.patientsStore.currentCategory &&
      this.patientsStore.currentCategory !== oldCategory
    ) {
      this.patientsStore.getExercisesByCategory(this.authStore.token ?? '');
    }
  };

  didChangeExercise = (path: IndexPath | IndexPath[]) => {
    if (Array.isArray(path)) {
      this.patientsStore.setCurrentExercise(path[0]);
    } else {
      this.patientsStore.setCurrentExercise(path);
    }
  };

  didChangeSerie = (path: IndexPath | IndexPath[]) => {
    if (Array.isArray(path)) {
      this.patientsStore.setCurrentSerie(path[0]);
    } else {
      this.patientsStore.setCurrentSerie(path);
    }
  };

  didChangeRepetition = (path: IndexPath | IndexPath[]) => {
    if (Array.isArray(path)) {
      this.patientsStore.setCurrentRepetition(path[0]);
    } else {
      this.patientsStore.setCurrentRepetition(path);
    }
  };

  didChangeRest = (path: IndexPath | IndexPath[]) => {
    if (Array.isArray(path)) {
      this.patientsStore.setCurrentRest(path[0]);
    } else {
      this.patientsStore.setCurrentRest(path);
    }
  };

  didChangeWeight = (value: string) => {
    this.patientsStore.setWeight(value);
  };

  didChangeNote = (value: string) => {
    this.patientsStore.setNote(value);
  };

  onSaveExercise = async () => {
    await this.patientsStore.saveExercise(this.authStore.token ?? '');
  };

  dismissAlert = () => {
    if (this.patientsStore.alert?.type == AlertType.Success) {
      this.patientsStore.clearExercises();
      this.navigation.goBack();
    }
    this.patientsStore.alert = null;
  };

  onUnload() {
    this.patientsStore.clearExercises();
    this.patientsStore.alert = null;
  }

  goBack = () => {
    this.navigation.goBack();
  };
}

export default PatientExercisesViewModel;
