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
};

export default AdministratorServices;
