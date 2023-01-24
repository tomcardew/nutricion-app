import Environment from './Environment';
import RequestError from '../utils/RequestError';
import {useStores} from '../../use-store';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type ObjectType = {
  [key: string]: string;
};

export class RequestData {
  public url: string = '';
  public path: string = '';
  public method: RequestMethod = RequestMethod.GET;

  constructor(
    public service: NetworkingConfig,
    public token?: string,
    public query?: string,
    public body?: ObjectType,
  ) {
    this.url = service.url;
    this.path = service.path;
    this.method = service.method;
    this.token = token;
    this.query = query;
    this.body = body;
  }

  get fullPath() {
    return `${this.url}/${this.path}${this.query ? '&' + this.query : ''}`;
  }

  setQuery(query: ObjectType) {
    this.query = this.objToQueryString(query);
    return this;
  }

  setBody(body: ObjectType) {
    this.body = body;
    return this;
  }

  async request() {
    try {
      const result = await fetch(this.fullPath, {
        method: this.method,
        body: JSON.stringify(this.body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.token ?? 'asas',
        },
      });
      return await result.json();
    } catch (error) {
      return {
        code: 0,
        message: error,
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

const getPatients: NetworkingConfig = {
  url: fullURL,
  path: 'admin/patients',
  method: RequestMethod.GET,
};

export const Networking = {
  auth: {
    login,
    signup,
    passwordRecovery,
  },
  administrator: {
    getPatients,
  },
};
