import {useNavigation} from '@react-navigation/native';
import {LoginStore} from '../../../../../store/LoginStore';
import ScreenNames from '../../../../../../constants/Screens';
import {AuthStore} from '../../../../../store/AuthStore';

class LoginViewModel {
  loginStore: LoginStore;
  authStore: AuthStore;
  navigation: any;

  constructor(loginStore: LoginStore, authStore: AuthStore) {
    this.loginStore = loginStore;
    this.authStore = authStore;
    this.navigation = useNavigation();
  }

  didChangeEmail = (newValue: string) => {
    this.loginStore.setEmail(newValue);
  };

  didChangePassword = (newValue: string) => {
    this.loginStore.setPassword(newValue);
  };

  login = async () => {
    const data = await this.loginStore.login();
    if (this.loginStore.isAuthorized == true) {
      this.authStore.setToken(data.token);
      this.authStore.setUser(data.user);
    }
  };

  goToRegister = () => {
    this.navigation.navigate(ScreenNames.Signup.toString());
  };

  goToForgotPassword = () => {
    this.navigation.navigate(ScreenNames.ForgotPassword.toString());
  };

  dismissAlert = () => {
    this.loginStore.error = null;
  };
}

export default LoginViewModel;
