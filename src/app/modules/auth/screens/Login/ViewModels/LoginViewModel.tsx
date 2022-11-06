import {useNavigation} from '@react-navigation/native';
import {LoginStore} from '../../../../../store/LoginStore';
import ScreenNames from '../../../../../../constants/Screens';

class LoginViewModel {
  store: LoginStore;
  navigation: any;

  constructor(store: LoginStore) {
    this.store = store;
    this.navigation = useNavigation();
  }

  didChangeEmail = (newValue: string) => {
    this.store.setEmail(newValue);
  };

  didChangePassword = (newValue: string) => {
    this.store.setPassword(newValue);
  };

  login = () => {
    this.store.login();
  };

  goToRegister = () => {
    this.navigation.navigate(ScreenNames.Signup.toString());
  };

  goToForgotPassword = () => {
    this.navigation.navigate(ScreenNames.ForgotPassword.toString());
  };

  dismissAlert = () => {
    this.store.error = null;
  };
}

export default LoginViewModel;
