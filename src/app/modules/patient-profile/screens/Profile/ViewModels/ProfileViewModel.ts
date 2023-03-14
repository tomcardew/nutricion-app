import {useNavigation} from '@react-navigation/native';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {UserType} from '../../../../../../models/Common';
import {AuthStore} from '../../../../../store/AuthStore';
import {ProfileStore} from '../../../../../store/ProfileStore';
import ScreenNames from '../../../../../../constants/Screens';
import {Logger} from '../../../../../../utils/Utils';
import GoogleFit, {BucketUnit, Scopes} from 'react-native-google-fit';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import moment from 'moment';

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
    await this.initiateGoogleFit();
    const data = await this.profileStore.getProfile(
      this.authStore.token ?? '',
      UserType.Patient,
    );
    this.authStore.setUser(data.data.profile);
  };

  initiateGoogleFit = () => {
    const options = {
      scopes: [Scopes.FITNESS_ACTIVITY_READ, Scopes.FITNESS_ACTIVITY_WRITE],
    };
    GoogleFit.authorize(options)
      .then(result => {
        this.profileStore.isGoogleFitAuthorized = result.success;
        Logger.success('Google fit authorization result:', result);
        this.askPermissions().then(success => {
          if (success) {
            this.startRecording();
            this.getSteps();
          }
        });
      })
      .catch(error => {
        Logger.error('Google fit error', error);
      });
  };

  startRecording = () => {
    GoogleFit.startRecording(
      callback => {
        Logger.debug(callback);
      },
      ['step', 'activity'],
    );
  };

  getSteps = () => {
    GoogleFit.getDailySteps(new Date()).then(result => {
      Logger.debug(result);
      const steps = result.filter(
        item => item.source == 'com.google.android.gms:estimated_steps',
      )[0].rawSteps[0].steps;
      this.profileStore.stepCount = steps;
    });
  };

  askPermissions = async (): Promise<boolean> => {
    const result = await request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
    Logger.debug('Permissions result', result);
    switch (result) {
      case RESULTS.GRANTED:
        return true;
      default:
        return false;
    }
  };

  disconnect = () => {
    GoogleFit.disconnect();
  };

  showEditingOptions = () => {
    this.profileStore.showAlert(
      () => {
        this.authStore.logout();
        this.disconnect();
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

  goToProgress = () => {
    this.navigation.navigate(ScreenNames.PatientProgress.toString());
  };

  didPressSeeDiet = () => {
    this.navigation.navigate(ScreenNames.PatientDiet.toString());
  };

  didPressSeeVersion = () => {
    Logger.debug(`Navigating to ${ScreenNames.About.toString()}`);
    this.navigation.navigate(ScreenNames.About.toString());
  };

  goBack = () => {
    this.navigation.goBack();
  };
}

export default ProfileViewModel;
