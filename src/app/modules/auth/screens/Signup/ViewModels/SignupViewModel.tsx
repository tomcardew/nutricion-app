import {useNavigation} from '@react-navigation/native';
import {RegisterStore} from '../../../../../store/RegisterStore';
import {IndexPath} from '@ui-kitten/components';
import moment from 'moment';

class SignupViewModel {
  store: RegisterStore;
  navigation: any;

  constructor(store: RegisterStore) {
    this.store = store;
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

  registerUser = () => {
    this.store.registerUser();
  };

  dismissAlert = () => {
    this.store.error = null;
  };
}

export default SignupViewModel;
