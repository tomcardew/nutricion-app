import AdministratorServices from './administrator';
import PatientServices from './patient';
import {Logger} from '../utils/Utils';
import {UserType} from '../models/Common';
import {Use} from 'react-native-svg';
import {Asset} from 'react-native-image-picker';

const CommonServices = {
  getProfile: async (token: string, type: UserType) => {
    const isAdmin = type === UserType.Admin;
    let data;
    if (isAdmin) {
      data = await AdministratorServices.getProfile(token);
    } else {
      data = await PatientServices.getProfile(token);
    }
    return data;
  },
  changeProfilePicture: async (token: string, asset: Asset, type: UserType) => {
    const isAdmin = type === UserType.Admin;
    let data;
    if (isAdmin) {
      data = await AdministratorServices.changeProfilePicture(token, asset);
    } else {
      data = await PatientServices.changeProfilePicture(token, asset);
    }
    return data;
  },
};

export default CommonServices;