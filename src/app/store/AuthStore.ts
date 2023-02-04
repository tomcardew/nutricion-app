import AsyncStorage from '@react-native-community/async-storage';
import {makeAutoObservable, action} from 'mobx';
import {makePersistable, stopPersisting} from 'mobx-persist-store';
import {Profile} from '../../models/Profile';

export class AuthStore {
  public hydrating: boolean = true;

  public token: string | null = null;
  public user: Profile | null = null;

  constructor() {
    stopPersisting(this);
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
      }),
    );
  }

  public setToken = (token: string) => {
    this.token = token;
  };

  public setUser = (user: Profile) => {
    this.user = null;
    this.user = user;
  };

  public logout = () => {
    this.token = null;
    this.user = null;
  };
}
