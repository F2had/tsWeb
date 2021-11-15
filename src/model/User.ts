import axios, { AxiosResponse } from 'axios';
interface UserPorps {
  name?: string;
  age?: number;
  id?: number;
}
type Callback = () => void;

export default class User {
  events: { [key: string]: Callback[] } = {};
  constructor(private data: UserPorps) {}

  get<T extends keyof UserPorps>(propName: T): string | number | undefined {
    return this.data[propName];
  }

  set(update: UserPorps): void {
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || !handlers.length) {
      return;
    }
    handlers.forEach((callback) => {
      callback();
    });
  }

  fetch(): void {
    axios
      .get(`http://localhost:3000/users/${this.get('id')}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      })
      .catch((err) => {
        console.log('err :>> ', err.message);
      });
  }

  save(): void {
    const id = this.get('id')
    if (id) {
       axios
         .put(`http://localhost:3000/users/${id}`, this.data)
         .then((respone: AxiosResponse): void => {
           console.log(respone.data);
         })
         .catch((err) => {
           console.log(err.massage);
         });
    } else {
      axios
        .post(`http://localhost:3000/users`, this.data)
        .then((respone: AxiosResponse): void => {
          console.log(respone.data);
        })
        .catch((err) => {
          console.log(err.massage);
        });
    }
  }
}
