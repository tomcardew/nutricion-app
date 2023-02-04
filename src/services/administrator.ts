import {Networking, RequestData} from '../constants/Networking';
import {PatientExerciseBody} from '../models/Patients';
import {Asset} from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import {uriToFileType} from '../utils/Utils';

const AdministratorServices = {
  getProfile: async (token: string) => {
    try {
      const request = new RequestData(
        Networking.administrator.getProfile,
        token,
      );

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getPatients: async (token: string) => {
    try {
      const request = new RequestData(
        Networking.administrator.getPatients,
        token,
      );

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getPatientById: async (id: string, token: string) => {
    try {
      const request = new RequestData(
        Networking.administrator.getPatientById,
        token,
      );
      request.setParams(`/${id}`);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getPatientProgress: async (id: string, token: string) => {
    try {
      const request = new RequestData(
        Networking.administrator.getPatientProgress,
        token,
      );
      request.setParams(`/${id}`);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  toggleExercises: async (id: string, token: string) => {
    try {
      const request = new RequestData(
        Networking.administrator.toggleExercises,
        token,
      );
      request.setParams(`/${id}`);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getPatientPictures: async (id: string, token: string) => {
    try {
      const request = new RequestData(
        Networking.administrator.getPatientPictures,
        token,
      );
      request.setParams(`/${id}`);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  postPatientExercise: async (
    id: string,
    token: string,
    data: PatientExerciseBody,
  ) => {
    try {
      const request = new RequestData(
        Networking.administrator.postPatientExercise,
        token,
      );
      request.setParams(`/${id}`);
      request.setBody({...data});

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  changeProfilePicture: async (token: string, asset: Asset) => {
    try {
      const request = new RequestData(
        Networking.administrator.changeProfilePicture,
        token,
      );

      let formData = new FormData();
      const file = {
        name: `${uuid.v4()}.${uriToFileType(asset.uri ?? '.jpg')}`,
        type: asset.type,
        size: asset.fileSize,
        uri: asset.uri,
      };
      formData.append('file', file);

      request.setFormData(formData);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default AdministratorServices;
