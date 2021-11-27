import axios, { AxiosPromise } from 'axios';

interface HasIs {
  id?: number;
}
export default class ApiSync<T extends HasIs> {
  constructor(private url: string) {}
  fetch(id: number): AxiosPromise {
    return axios.get(`${this.url}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;
    if (id) {
      return axios.put(`${this.url}/${id}`, data);
    } else {
      return axios.post(this.url, data);
    }
  }
}
