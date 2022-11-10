import {createContext} from 'react';
import {LoginStore} from './LoginStore';
import {RegisterStore} from './RegisterStore';
import {ProfileStore} from './profile/ProfileStore';
import {AuthStore} from './AuthStore';
import {makePersistable} from 'mobx-persist-store';
import AsyncStorage from '@react-native-community/async-storage';
import {action} from 'mobx';

export const rootStoreContext = createContext({
  loginStore: new LoginStore(),
  registerStore: new RegisterStore(),
  profileStore: new ProfileStore(),
  authStore: new AuthStore(),
});
