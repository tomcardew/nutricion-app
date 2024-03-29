import {PatientsStore} from '../../../../../store/PatientsStore';
import {AuthStore} from '../../../../../store/AuthStore';
import ScreenNames from '../../../../../../constants/Screens';
import {AlertMessage} from '../../../../../../models/Common';
import DocumentPicker from 'react-native-document-picker';
import {Logger} from '../../../../../../utils/Utils';

class PatientViewModel {
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

  load = async () => {
    await this.patientsStore.getPatientById(this.authStore.token ?? '');
  };

  unload = () => {
    this.patientsStore.selectedPatient = null;
  };

  navigateTo = (screen: ScreenNames, props?: any) => {
    this.navigation.navigate(screen.toString(), props);
  };

  toggleExercises = async () => {
    await this.patientsStore.toggleExercises(this.authStore.token ?? '');
  };

  toggleAccess = async (toValue: boolean) => {
    if (toValue) {
      this.patientsStore.showToggleEnableAccessAlert(this.toggleAccessCall);
    } else {
      this.patientsStore.showToggleDisableAccessAlert(this.toggleAccessCall);
    }
  };

  toggleAccessCall = async () => {
    this.dismissAlert();
    await this.patientsStore.toggleAccess(this.authStore.token ?? '');
    await this.load();
  };

  onUploadDiet = () => {
    this.dismissAlert();
    this.patientsStore.showSelectDietDocument(this.selectedDietDocument);
  };

  selectedDietDocument = async () => {
    this.dismissAlert();
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: ['application/pdf'],
      });
      const data = await this.patientsStore.uploadDiet(
        this.authStore.token ?? '',
        {
          uri: pickerResult.uri,
          fileSize: pickerResult.size ?? undefined,
          fileName: pickerResult.name ?? undefined,
          type: pickerResult.type ?? undefined,
        },
      );
      if (data) {
        this.patientsStore.showUploadDietSuccess();
      }
    } catch (error) {
      Logger.error(error);
    }
  };

  dismissAlert = () => {
    this.patientsStore.alert = null;
  };

  goBack = () => {
    this.dismissAlert();
    this.navigation.goBack(ScreenNames.Patients.toString());
  };
}

export default PatientViewModel;
