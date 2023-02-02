import {Networking, RequestData} from '../constants/Networking';

const AdministratorServices = {
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
};

export default AdministratorServices;
