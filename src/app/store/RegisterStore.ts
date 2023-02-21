import {makeAutoObservable} from 'mobx';
import {IndexPath} from '@ui-kitten/components';
import AuthServices from '../../services/auth';
import ErrorCatalogue from '../../utils/ErrorCatalogue';
import {AlertMessage, AlertType} from '../../models/Common';
import { Profile } from '../../models/Profile';

export class RegisterStore {
  public name: string = '';
  public birthdate: Date | undefined = undefined;
  public gender: IndexPath | undefined = undefined;
  public email: string = '';
  public password: string = '';
  public passwordConfirmation: string = '';

  public loading: boolean = false;
  public error: AlertMessage | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public setName(name: string) {
    this.name = name;
  }

  public setBithdate(date: Date | undefined) {
    this.birthdate = date;
  }

  public setGenderIndex(index: IndexPath | IndexPath[]) {
    if (Array.isArray(index)) {
      this.gender = index[0];
    } else {
      this.gender = index;
    }
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public setPassword(pw: string) {
    this.password = pw;
  }

  public setPasswordConfirmation(pw: string) {
    this.passwordConfirmation = pw;
  }

  public registerUser = async () => {
    this.loading = true;
    if (
      this.name &&
      this.birthdate &&
      this.genderText &&
      this.email &&
      this.password
    ) {
      const data = await AuthServices.signup(
        this.name,
        this.birthdate.toISOString().split('T')[0],
        this.genderText,
        this.email,
        this.password,
      );
      this.loading = false;
      if (data.success) {
        return {
          token: data.token,
          profile: data.customer
        };
      } else {
        this.error = {
          title: 'Ocurrió un error',
          message: ErrorCatalogue.get(data.error),
          type: AlertType.Error,
          showIcon: true,
          actions: [{label: 'Cerrar'}],
        };
        return null;
      }
    } else {
      this.loading = false;
      this.error = {
        title: 'Datos faltantes',
        message: 'No has llenado todos tus datos',
        type: AlertType.Warning,
        showIcon: true,
        actions: [{label: 'Cerrar'}],
      };
      return null;
    }
  };

  get genderText() {
    const genders = ['Femenino', 'Masculino'];
    if (this.gender) {
      return genders[this.gender.row];
    }
    return '';
  }
}
