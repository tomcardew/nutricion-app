import {Networking, RequestData} from '../constants/Networking';

const CataloguesServices = {
  getExerciseCategories: async (token: string) => {
    try {
      const request = new RequestData(
        Networking.catalogues.getExerciseCategories,
        token,
      );

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getExercisesByCategory: async (token: string, category: number) => {
    try {
      const request = new RequestData(
        Networking.catalogues.getExercisesByCategory,
        token,
      );
      request.setParams(`/${category}`);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getSeries: async (token: string) => {
    try {
      const request = new RequestData(Networking.catalogues.getSeries, token);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getRepetitions: async (token: string) => {
    try {
      const request = new RequestData(
        Networking.catalogues.getRepetitions,
        token,
      );

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getRest: async (token: string) => {
    try {
      const request = new RequestData(Networking.catalogues.getRest, token);

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default CataloguesServices;
