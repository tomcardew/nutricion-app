import { Asset } from "react-native-image-picker";
import { Networking, RequestData } from "../constants/Networking";
import uuid from "react-native-uuid";
import { uriToFileType } from "../utils/Utils";
import { GalleryCategory } from "../models/Common";

const PatientServices = {
  getProfile: async (token: string) => {
    try {
      const request = new RequestData(
        Networking.patient.getPatientProfile,
        token
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
        token
      );

      let formData = new FormData();
      const file = {
        name: `${uuid.v4()}.${uriToFileType(asset.uri ?? ".jpg")}`,
        type: asset.type,
        size: asset.fileSize,
        uri: asset.uri,
      };
      formData.append("file", file);

      request.setFormData(formData);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getPatientExercises: async (token: string) => {
    try {
      const request = new RequestData(
        Networking.patient.getPatientExercises,
        token
      );

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  markExerciseAsCompleted: async (id: number, token: string) => {
    try {
      const request = new RequestData(
        Networking.patient.markExerciseAsCompleted,
        token
      );

      request.setParams(`/${id}`);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getActivityPictures: async (token: string) => {
    try {
      const request = new RequestData(
        Networking.patient.getActivityPictures,
        token
      );

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  postActivityPicture: async (
    token: string,
    asset: Asset,
    category: GalleryCategory
  ) => {
    try {
      const request = new RequestData(
        Networking.patient.postActivityPicture,
        token
      );

      let formData = new FormData();
      const file = {
        name: `${uuid.v4()}.${uriToFileType(asset.uri ?? ".jpg")}`,
        type: asset.type,
        size: asset.fileSize,
        uri: asset.uri,
      };
      formData.append("file", file);
      formData.append("categoria", category.toString());

      request.setFormData(formData);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getDates: async (token: string) => {
    try {
      const request = new RequestData(Networking.patient.getDates, token);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getDiet: async (token: string) => {
    try {
      const request = new RequestData(Networking.patient.getDiet, token);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  postSteps: async (token: string, cantidad: string) => {
    try {
      const request = new RequestData(Networking.patient.postSteps, token);
      request.setBody({ cantidad });

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  addComment: async (token: string, exerciseId: string, notas: string) => {
    try {
      const request = new RequestData(
        Networking.patient.addPatientComment,
        token
      );
      request.setParams(`/${exerciseId}`);
      request.setBody({
        notas,
      });

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getPendingDates: async (token: string) => {
    try {
      const request = new RequestData(
        Networking.patient.getPatientPendingDates,
        token
      );

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getPendingExercises: async (token: string) => {
    try {
      const request = new RequestData(
        Networking.patient.getPatientPendingExercises,
        token
      );

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default PatientServices;
