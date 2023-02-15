import {Logger} from '../utils/Utils';
import Environment from './Environment';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type ObjectType = {
  [key: string]: any;
};

export class RequestData {
  public url: string = '';
  public path: string = '';
  public method: RequestMethod = RequestMethod.GET;

  constructor(
    public service: NetworkingConfig,
    public token?: string,
    public params?: string,
    public query?: string,
    public body?: ObjectType,
    public formData?: FormData,
  ) {
    this.url = service.url;
    this.path = service.path;
    this.method = service.method;
    this.token = token;
    this.params = params;
    this.query = query;
    this.body = body;
    this.formData = formData;
  }

  get fullPath() {
    return `${this.url}/${this.path}${this.params ? this.params : ''}${
      this.query ? '&' + this.query : ''
    }`;
  }

  setQuery(query: ObjectType) {
    this.query = this.objToQueryString(query);
    return this;
  }

  setBody(body: ObjectType) {
    this.body = body;
    return this;
  }

  setParams(params: string) {
    this.params = params;
    return this;
  }

  setFormData(data: FormData) {
    this.formData = data;
    return this;
  }

  async request() {
    Logger.info('Requesting endpoint', this.fullPath);
    const data = this.formData
      ? await this.requestFormData()
      : await this.requestBody();
    if (data.error) {
      Logger.error(
        'Request to endpoint',
        this.fullPath,
        ' failed:',
        data.error,
      );
    } else {
      Logger.success('Request to endpoint', this.fullPath, 'was successful');
    }
    return data;
  }

  private async requestBody() {
    this.body && Logger.warn(this.body);
    try {
      const result = await fetch(this.fullPath, {
        method: this.method,
        body: JSON.stringify(this.body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.token ?? '',
        },
      });
      return await result.json();
    } catch (error) {
      return {
        error: {
          code: 0,
          message: error,
        },
      };
    }
  }

  private async requestFormData() {
    this.formData && Logger.debug(this.formData);
    try {
      const result = await fetch(this.fullPath, {
        method: this.method,
        body: this.formData,
        headers: {
          Authorization: this.token ?? '',
        },
      });
      return await result.json();
    } catch (error: any) {
      return {
        error: {
          code: 0,
          message: {...error},
        },
      };
    }
  }

  private objToQueryString(obj: ObjectType) {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(
        encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
      );
    }
    return keyValuePairs.join('&');
  }
}

const fullURL = Environment.URL + ':' + Environment.PORT;

export interface NetworkingConfig {
  url: string;
  path: string;
  method: RequestMethod;
}

const login: NetworkingConfig = {
  url: fullURL,
  path: 'auth/login',
  method: RequestMethod.POST,
};

const signup: NetworkingConfig = {
  url: fullURL,
  path: 'auth/signup',
  method: RequestMethod.POST,
};

const passwordRecovery: NetworkingConfig = {
  url: fullURL,
  path: 'auth/recovery-password',
  method: RequestMethod.PATCH,
};

const getProfile: NetworkingConfig = {
  url: fullURL,
  path: 'admin',
  method: RequestMethod.GET,
};

const getPatients: NetworkingConfig = {
  url: fullURL,
  path: 'admin/patients',
  method: RequestMethod.GET,
};

const getPatientById: NetworkingConfig = {
  url: fullURL,
  path: 'admin/patients',
  method: RequestMethod.GET,
};

const getPatientProgress: NetworkingConfig = {
  url: fullURL,
  path: 'admin/patients/progress',
  method: RequestMethod.GET,
};

const postPatientProgress: NetworkingConfig = {
  url: fullURL,
  path: 'admin/patients/progress',
  method: RequestMethod.POST,
};

const toggleExercises: NetworkingConfig = {
  url: fullURL,
  path: 'admin/patients/activate-exercises',
  method: RequestMethod.PATCH,
};

const getPatientPictures: NetworkingConfig = {
  url: fullURL,
  path: 'admin/patients/pictures',
  method: RequestMethod.GET,
};

const getAdminExercises: NetworkingConfig = {
  url: fullURL,
  path: 'admin/patients/exercises',
  method: RequestMethod.GET,
};

const postPatientExercise: NetworkingConfig = {
  url: fullURL,
  path: 'admin/patients/set-exercise',
  method: RequestMethod.POST,
};

const changeProfilePicture: NetworkingConfig = {
  url: fullURL,
  path: 'admin/changeProfilePicture',
  method: RequestMethod.PATCH,
};

const getAllDates: NetworkingConfig = {
  url: fullURL,
  path: 'admin/dates',
  method: RequestMethod.GET,
};

const postPatientDate: NetworkingConfig = {
  url: fullURL,
  path: 'admin/patients/set-date',
  method: RequestMethod.POST,
};

const postPatientActivityPicture: NetworkingConfig = {
  url: fullURL,
  path: 'admin/upload-activity-picture',
  method: RequestMethod.POST,
};

const getExerciseCategories: NetworkingConfig = {
  url: fullURL,
  path: 'catalogues/categories',
  method: RequestMethod.GET,
};

const getExercisesByCategory: NetworkingConfig = {
  url: fullURL,
  path: 'catalogues/exercisesByCategory',
  method: RequestMethod.GET,
};

const getSeries: NetworkingConfig = {
  url: fullURL,
  path: 'catalogues/series',
  method: RequestMethod.GET,
};

const getRepetitions: NetworkingConfig = {
  url: fullURL,
  path: 'catalogues/repetitions',
  method: RequestMethod.GET,
};

const getRest: NetworkingConfig = {
  url: fullURL,
  path: 'catalogues/rest',
  method: RequestMethod.GET,
};

const getPatientProfile: NetworkingConfig = {
  url: fullURL,
  path: 'patient',
  method: RequestMethod.GET,
};

const changePatientProfilePicture: NetworkingConfig = {
  url: fullURL,
  path: 'patient/changeProfilePicture',
  method: RequestMethod.PATCH,
};

const getPatientExercises: NetworkingConfig = {
  url: fullURL,
  path: 'patient/exercises',
  method: RequestMethod.GET,
};

const markExerciseAsCompleted: NetworkingConfig = {
  url: fullURL,
  path: 'patient/exercises/mark-exercise-as-completed',
  method: RequestMethod.PATCH,
};

const getActivityPictures: NetworkingConfig = {
  url: fullURL,
  path: 'patient/activity-pictures',
  method: RequestMethod.GET,
};

const postActivityPicture: NetworkingConfig = {
  url: fullURL,
  path: 'patient/upload-activity-picture',
  method: RequestMethod.POST,
};

const getDates: NetworkingConfig = {
  url: fullURL,
  path: 'patient/dates',
  method: RequestMethod.GET,
};

export const Networking = {
  auth: {
    login,
    signup,
    passwordRecovery,
  },
  administrator: {
    getProfile,
    getPatients,
    getPatientById,
    getPatientProgress,
    postPatientProgress,
    toggleExercises,
    getPatientPictures,
    getAdminExercises,
    postPatientExercise,
    changeProfilePicture,
    getAllDates,
    postPatientDate,
    postPatientActivityPicture,
  },
  catalogues: {
    getExerciseCategories,
    getExercisesByCategory,
    getSeries,
    getRepetitions,
    getRest,
  },
  patient: {
    getPatientProfile,
    changePatientProfilePicture,
    getPatientExercises,
    markExerciseAsCompleted,
    getActivityPictures,
    postActivityPicture,
    getDates,
  },
};
