import { Networking, RequestData } from "../constants/Networking";
import { PatientExerciseBody, PatientProgress } from "../models/Patients";
import { Asset } from "react-native-image-picker";
import uuid from "react-native-uuid";
import { uriToFileType } from "../utils/Utils";
import moment from "moment";
import { ScheduleDateBody } from "../models/Schedule";
import { GalleryCategory } from "../models/Common";

const AdministratorServices = {
  getProfile: async (token: string) => {
    try {
      const request = new RequestData(
        Networking.administrator.getProfile,
        token
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
        token
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
        token
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
        token
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
    data: PatientProgress
  ) => {
    try {
      const request = new RequestData(
        Networking.administrator.postPatientProgress,
        token
      );
      request.setParams(`/${id}`);
      request.setBody({ ...data });

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
        token
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
        token
      );
      request.setParams(`/${id}`);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getAdminExercises: async (id: string, token: string, date: Date) => {
    const _date = moment(date).format("yyyy-MM-DD");
    try {
      const request = new RequestData(
        Networking.administrator.getAdminExercises,
        token
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
    data: PatientExerciseBody
  ) => {
    try {
      const request = new RequestData(
        Networking.administrator.postPatientExercise,
        token
      );
      request.setParams(`/${id}`);
      request.setBody({ ...data });

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
  getAllDates: async (token: string) => {
    try {
      const request = new RequestData(
        Networking.administrator.getAllDates,
        token
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
    data: ScheduleDateBody
  ) => {
    try {
      const request = new RequestData(
        Networking.administrator.postPatientDate,
        token
      );
      request.setParams(`/${id}`);
      request.setBody({ ...data });

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
    category: GalleryCategory
  ) => {
    try {
      const request = new RequestData(
        Networking.administrator.postPatientActivityPicture,
        token
      );
      request.setParams(`/${id}`);

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
  toggleAccess: async (id: string, token: string) => {
    try {
      const request = new RequestData(
        Networking.administrator.changePatientStatus,
        token
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
        token
      );
      request.setParams(`/${id}`);

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
  getSteps: async (token: string, patientId: string, date: Date) => {
    const _date = moment(date).format("yyyy-MM-DD");
    try {
      const request = new RequestData(Networking.administrator.getSteps, token);
      request.setParams(`/${patientId}/${_date}`);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  addComment: async (
    token: string,
    patientId: string,
    exerciseId: string,
    notas: string
  ) => {
    try {
      const request = new RequestData(
        Networking.administrator.addComment,
        token
      );
      request.setParams(`/${patientId}/${exerciseId}`);
      request.setBody({
        notas,
      });

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  deleteExercise: async (
    token: string,
    patientId: string,
    exerciseId: number
  ) => {
    try {
      const request = new RequestData(
        Networking.administrator.deleteExercise,
        token
      );
      request.setParams(`/${patientId}/${exerciseId}`);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getPendingDates: async (token: string) => {
    try {
      const request = new RequestData(
        Networking.administrator.getPendingDates,
        token
      );

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getObjectives: async (token: string, patientId: string) => {
    try {
      const request = new RequestData(
        Networking.administrator.getObjectives,
        token
      );
      request.setParams(`/${patientId}`);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  setObjective: async (token: string, patientId: string, objective: string) => {
    try {
      const request = new RequestData(
        Networking.administrator.setObjectives,
        token
      );
      request.setParams(`/${patientId}`);
      request.setBody({ descripcion: objective });

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  markObjectiveAsCompleted: async (
    token: string,
    patientId: string,
    objectiveId: number
  ) => {
    try {
      const request = new RequestData(
        Networking.administrator.markObjectiveAsCompleted,
        token
      );
      request.setParams(`/${patientId}/${objectiveId}`);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  editObjective: async (
    token: string,
    patientId: string,
    objectiveId: number,
    objective: string
  ) => {
    try {
      const request = new RequestData(
        Networking.administrator.editObjective,
        token
      );
      request.setParams(`/${patientId}/${objectiveId}`);
      request.setBody({ descripcion: objective });

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  deleteObjective: async (
    token: string,
    patientId: string,
    objectiveId: number
  ) => {
    try {
      const request = new RequestData(
        Networking.administrator.deleteObjective,
        token
      );
      request.setParams(`/${patientId}/${objectiveId}`);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default AdministratorServices;
