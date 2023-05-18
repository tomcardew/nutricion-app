import AsyncStorage from '@react-native-community/async-storage';
import {makeAutoObservable, action} from 'mobx';
import {makePersistable, stopPersisting} from 'mobx-persist-store';
import {Profile, profileDataToGraphData} from '../../models/Profile';
import {Logger} from '../../utils/Utils';
import {ProgressDataSetElement} from '../modules/patient-profile/screens/PatientProgress/Views/PatientProgressView';
import {PatientProgresCategories} from '../../models/Patients';

export class AuthStore {
  public hydrating: boolean = true;

  public token: string | null = null;
  public user: Profile | null = null;

  public releaseNotes: string = '';
  public loading: boolean = false;

  public lastStepCount: number = 0;

  // Progress Data - Patient
  public progressCategory: PatientProgresCategories =
    PatientProgresCategories.PLIEGUES;

  constructor() {
    stopPersisting(this);
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'auth',
      storage: AsyncStorage,
      properties: ['token', 'user', 'lastStepCount'],
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

  get dataset() {
    let sets: ProgressDataSetElement[] = [];
    if (this.user && this.user.Datos && this.user.Datos.length > 0) {
      const keys = Object.keys(this.user.Datos[0])
        .filter(value => !['id', 'fecha_registro'].includes(value))
        .filter(value => value.startsWith(this.progressCategory.toString()));
      sets = keys.map(key => {
        Logger.info(key);
        return {
          title: key,
          data: profileDataToGraphData(this.user!, key)!,
        };
      });
    }
    Logger.warn(sets);
    return sets;
  }
}
