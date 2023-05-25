import AdministratorServices from './administrator';
import PatientServices from './patient';
import {UserType} from '../models/Common';
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
  addComment: async (
    token: string,
    notas: string,
    type: UserType,
    patientId?: string,
    exerciseId?: string,
  ) => {
    const isAdmin = type === UserType.Admin;
    let data;
    if (isAdmin) {
      data = await AdministratorServices.addComment(token, patientId ?? '', exerciseId ?? '', notas)
    } else {
      data = await PatientServices.addComment(token, exerciseId ?? '', notas)
    }
    return data;
  },
};

export default CommonServices;
