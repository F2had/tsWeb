import { AxiosPromise, AxiosResponse, AxiosError } from 'axios';

interface ModelAttrubutes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}
export default class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttrubutes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {

  }


  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(data: T): void {
    this.attributes.set(data);
    this.events.trigger('change');
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
    .then((response: AxiosResponse) => {
      this.trigger('save');
      
    }).catch((err: AxiosError) => {
      console.log(err);
    });
  }

  fetch(): void {
    const id = this.attributes.get("id");
    if(typeof id !== 'number'){
      throw new Error('Can not fetch without id');
    }
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.attributes.set(response.data);
    });
  }

}
