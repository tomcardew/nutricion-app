import {Networking, RequestData} from '../constants/Networking';

const AuthServices = {
  login: async (email: string, password: string) => {
    try {
      const request = new RequestData(Networking.auth.login);
      request.setBody({email, password});

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  signup: async (
    nombre: string,
    fecha_nacimiento: string,
    genero: string,
    email: string,
    password: string,
  ) => {
    try {
      const request = new RequestData(Networking.auth.signup);
      request.setBody({nombre, fecha_nacimiento, genero, email, password});

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  passwordRecovery: async (email: string) => {
    try {
      const request = new RequestData(Networking.auth.passwordRecovery);
      request.setBody({email});

      const response = await request.request();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default AuthServices;
