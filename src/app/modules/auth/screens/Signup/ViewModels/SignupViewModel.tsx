import {useNavigation} from '@react-navigation/native';
import {RegisterStore} from '../../../../../store/RegisterStore';
import {IndexPath} from '@ui-kitten/components';
import moment from 'moment';
import { AuthStore } from '../../../../../store/AuthStore';
import ScreenNames from '../../../../../../constants/Screens';

class SignupViewModel {
  store: RegisterStore;
  authStore: AuthStore;
  navigation: any;

  constructor(store: RegisterStore, authStore: AuthStore) {
    this.store = store;
    this.authStore = authStore;
    this.navigation = useNavigation();
  }

  didChangeName = (newValue: string) => {
    this.store.setName(newValue);
  };

  didChangeDate = (newValue: Date | string | undefined) => {
    const _date = moment(newValue, 'YYYY/MM/DD').toDate();
    this.store.setBithdate(_date);
  };

  didChangeGender = (newValue: IndexPath | IndexPath[]) => {
    this.store.setGenderIndex(newValue);
  };

  didChangeEmail = (newValue: string) => {
    this.store.setEmail(newValue);
  };

  didChangePassword = (newValue: string) => {
    this.store.setPassword(newValue);
  };

  didChangePasswordConfirmation = (newValue: string) => {
    this.store.setPasswordConfirmation(newValue);
  };

  goBack = () => {
    this.navigation.goBack();
  };

  registerUser = async () => {
    const result = await this.store.registerUser();
    if (result) {
      this.authStore.setToken(result.token)
      this.authStore.setUser(result.profile)
      this.navigation.navigate(ScreenNames.Dashboard.toString());
    }
  };

  dismissAlert = () => {
    this.store.error = null;
  };
}

export default SignupViewModel;
