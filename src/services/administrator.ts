import {Networking, RequestData} from '../constants/Networking';
import {PatientExerciseBody, PatientProgress} from '../models/Patients';
import {Asset} from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import {uriToFileType} from '../utils/Utils';
import moment from 'moment';
import {ScheduleDateBody} from '../models/Schedule';
import {GalleryCategory} from '../models/Common';

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
  postPatientProgress: async (
    id: string,
    token: string,
    data: PatientProgress,
  ) => {
    try {
      const request = new RequestData(
        Networking.administrator.postPatientProgress,
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
  getAdminExercises: async (id: string, token: string, date: Date) => {
    const _date = moment(date).utc(true).format('yyyy-MM-DD');
    try {
      const request = new RequestData(
        Networking.administrator.getAdminExercises,
        token,
      );
      request.setParams(`/${id}/${_date}`);

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
  getAllDates: async (token: string) => {
    try {
      const request = new RequestData(
        Networking.administrator.getAllDates,
        token,
      );

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  postPatientDate: async (
    id: string,
    token: string,
    data: ScheduleDateBody,
  ) => {
    try {
      const request = new RequestData(
        Networking.administrator.postPatientDate,
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
  postPatientActivityPicture: async (
    id: string,
    token: string,
    asset: Asset,
    category: GalleryCategory,
  ) => {
    try {
      const request = new RequestData(
        Networking.administrator.postPatientActivityPicture,
        token,
      );
      request.setParams(`/${id}`);

      let formData = new FormData();
      const file = {
        name: `${uuid.v4()}.${uriToFileType(asset.uri ?? '.jpg')}`,
        type: asset.type,
        size: asset.fileSize,
        uri: asset.uri,
      };
      formData.append('file', file);
      formData.append('categoria', category.toString());

      request.setFormData(formData);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  toggleAccess: async (id: string, token: string) => {
    try {
      const request = new RequestData(
        Networking.administrator.changePatientStatus,
        token,
      );
      request.setParams(`/${id}`);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  uploadPatientDiet: async (id: string, token: string, asset: Asset) => {
    try {
      const request = new RequestData(
        Networking.administrator.uploadPatientDiet,
        token,
      );
      request.setParams(`/${id}`);

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
  getSteps: async (token: string, patientId: string, date: Date) => {
    const _date = moment(date).utc(true).format('yyyy-MM-DD');
    try {
      const request = new RequestData(Networking.administrator.getSteps, token);
      request.setParams(`/${patientId}/${_date}`);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default AdministratorServices;
