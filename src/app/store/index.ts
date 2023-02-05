import {createContext} from 'react';
import {LoginStore} from './LoginStore';
import {RegisterStore} from './RegisterStore';
import {ProfileStore} from './profile/ProfileStore';
import {AuthStore} from './AuthStore';
import {PatientsStore} from './patients/PatientsStore';
import {ScheduleStore} from './ScheduleStore';

export const rootStoreContext = createContext({
  loginStore: new LoginStore(),
  registerStore: new RegisterStore(),
  profileStore: new ProfileStore(),
  authStore: new AuthStore(),
  patientsStore: new PatientsStore(),
  scheduleStore: new ScheduleStore(),
});
