import {createContext} from 'react';
import {LoginStore} from './LoginStore';
import {RegisterStore} from './RegisterStore';

export const rootStoreContext = createContext({
  loginStore: new LoginStore(),
  registerStore: new RegisterStore(),
});
