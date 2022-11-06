import Environment from './Environment';
import RequestError from '../utils/RequestError';

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
  constructor(
    public url: string,
    public path: string,
    public method: RequestMethod,
    public query?: string,
    public body?: ObjectType,
  ) {}

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

export const Networking = {
  auth: {
    login,
    signup,
    passwordRecovery,
  },
};
