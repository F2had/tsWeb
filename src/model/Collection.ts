import axios, { AxiosError, AxiosResponse } from 'axios';
import { Eventing } from './Eventing';
export default class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public url: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios
      .get(this.url)
      .then((response: AxiosResponse) => {
        response.data.forEach((value: K) => {
          this.models.push(this.deserialize(value));
        });
      })
      .catch((err: AxiosError) => {
        throw err;
      });
  }
}
