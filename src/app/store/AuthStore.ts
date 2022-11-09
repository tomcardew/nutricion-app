import AsyncStorage from '@react-native-community/async-storage';
import {makeAutoObservable, action} from 'mobx';
import {makePersistable} from 'mobx-persist-store';

export interface UserData {
  idUsuario: string;
  nombre: string;
  fechaNacimiento: Date;
  email: string;
  urlFoto?: string;
  genero: string;
  esAdministrador: boolean;
  tempToken?: string;
  activo: boolean;
  seccion_ejercicios: boolean;
}

export class AuthStore {
  public hydrating: boolean = true;

  public token: string | null = null;
  public user: UserData | null = null;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'auth',
      storage: AsyncStorage,
      properties: ['token', 'user'],
      stringify: true,
    }).then(
      action(persistStore => {
        console.log(
          `Store ${persistStore.storageName} ${
            persistStore.isHydrated ? 'is hydrated' : 'is not hydrated'
          }`,
        );
        this.hydrating = false;
        console.log(this.user?.urlFoto);
      }),
    );
  }

  public setToken = (token: string) => {
    console.log(`Setting token ${token}`);
    this.token = token;
  };

  public setUser = (user: UserData) => {
    this.user = user;
  };

  public logout = () => {
    this.token = null;
    this.user = null;
  };
}
