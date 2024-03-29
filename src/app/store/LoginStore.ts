import {makeAutoObservable} from 'mobx';
import {AlertMessage, AlertType} from '../../models/Common';
import AuthServices from '../../services/auth';
import ErrorCatalogue from '../../utils/ErrorCatalogue';

export class LoginStore {
  public isAuthorized: boolean = false;

  public email: string = '';
  public password: string = '';
  public logingIn: boolean = false;

  public error: AlertMessage | null = null;
  public alert: AlertMessage | null = null;

  public loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public login = async () => {
    this.logingIn = true;
    const email = this.email.trim();
    const password = this.password.trim();
    if (this.email && this.password) {
      const data = await AuthServices.login(email, password);
      this.logingIn = false;
      if (data.success) {
        this.isAuthorized = true;
        return data;
      } else {
        this.error = {
          title: 'Ocurrió un error',
          message: ErrorCatalogue.get(data.error),
          type: AlertType.Error,
          showIcon: true,
          actions: [],
          autoClose: true,
        };
        return null;
      }
    } else {
      this.logingIn = false;
      this.error = {
        title: 'Datos faltantes',
        message: 'No has llenado todos tus datos',
        type: AlertType.Warning,
        showIcon: true,
        actions: [],
        autoClose: true,
      };
      return null;
    }
  };

  public setEmail = (email: string) => {
    this.email = email;
  };

  public setPassword = (password: string) => {
    this.password = password;
  };

  public sendEmail = async () => {
    this.loading = true;
    if (this.email) {
      const data = await AuthServices.passwordRecovery(this.email);
      this.loading = false;
      if (data.success) {
        this.alert = {
          title: 'Listo',
          message:
            'Recibirás un correo electrónico con un enlace para recuperar tu cuenta',
          type: AlertType.Success,
          showIcon: true,
          actions: [],
          autoClose: true,
        };
      } else {
        this.alert = {
          title: 'Ocurrió un error',
          message: ErrorCatalogue.get(data.error),
          type: AlertType.Error,
          showIcon: true,
          actions: [],
          autoClose: true,
        };
      }
    } else {
      this.loading = false;
      this.alert = {
        title: 'Datos faltantes',
        message: 'No has llenado todos tus datos',
        type: AlertType.Warning,
        showIcon: true,
        actions: [],
        autoClose: true,
      };
    }
  };
}
