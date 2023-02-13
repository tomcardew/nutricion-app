import {Asset} from 'react-native-image-picker';
import {Networking, RequestData} from '../constants/Networking';
import uuid from 'react-native-uuid';
import {uriToFileType} from '../utils/Utils';

const PatientServices = {
  getProfile: async (token: string) => {
    try {
      const request = new RequestData(
        Networking.patient.getPatientProfile,
        token,
      );

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  changeProfilePicture: async (token: string, asset: Asset) => {
    try {
      const request = new RequestData(
        Networking.patient.changePatientProfilePicture,
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

export default PatientServices;
