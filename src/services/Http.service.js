import axios from 'axios';
import { toast } from 'react-toastify';

export class HttpService {
  async get(path, headers = {}) {
    try {
      return await axios.get(path, this.createHeaderOptions(headers));
    } catch (exception) {
      return this.catchHttpException(exception);
    }
  }

  async post(path, data, headers = {}) {
    console.log(`POST request to: ${path}`);
    try {
      return await axios.post(path, data, this.createHeaderOptions(headers));
    } catch (exception) {
      return this.catchHttpException(exception);
    }
  }

  async put(path, data, headers = {}) {
    try {
      return await axios.put(path, data, this.createHeaderOptions(headers));
    } catch (exception) {
      return this.catchHttpException(exception);
    }
  }

  async patch(path, data, headers = {}) {
    try {
      return await axios.patch(path, data, this.createHeaderOptions(headers));
    } catch (exception) {
      return this.catchHttpException(exception);
    }
  }

  async delete(path, headers = {}) {
    try {
      return await axios.delete(path, this.createHeaderOptions(headers));
    } catch (exception) {
      return this.catchHttpException(exception);
    }
  }

  async catchHttpException(exception) {
    if (exception.response && exception.response.status === 401) {
      localStorage.removeItem('clerk-db-jwt');
      return;
    }

    if (exception.response && exception.response.status === 403) {
      toast.warn("You are not allowed to do this action");
    }
    return Promise.reject(exception);
  }

  createHeaderOptions(headers) {
    return {
      headers: {
        'Content-Type': 'application/json',
        ...headers // Merge any custom headers
      }
    };
  }

  objToQuery(obj) {
    if (!obj) return '';
    const params = new URLSearchParams();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        params.set(key, obj[key]);
      }
    }
    return '?' + params.toString();
  }
}
