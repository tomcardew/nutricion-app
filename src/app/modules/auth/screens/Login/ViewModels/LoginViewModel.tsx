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
      this.navigation.navigate(ScreenNames.Dashboard.toString());
    }
    // this.authStore.setToken('XD');
    // this.authStore.setUser({
    //   idUsuario: '',
    //   email: 'tomcar97@gmail.com',
    //   activo: true,
    //   esAdministrador: true,
    //   fechaNacimiento: new Date(),
    //   genero: 'Masculino',
    //   nombre: 'Andrés Villagómez',
    //   seccion_ejercicios: false,
    //   tempToken: undefined,
    //   urlFoto:
    //     'https://i.etsystatic.com/36532523/r/il/97ae46/4078306713/il_340x270.4078306713_n74s.jpg',
    // });
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
