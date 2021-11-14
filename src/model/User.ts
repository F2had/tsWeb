interface UserPorps {
  name?: string;
  age?: number;
}
type Callback = () => {}

export default class User {
  constructor(private data: UserPorps) {}

  get<T extends keyof UserPorps>(propName: T): string | number | undefined {
    return this.data[propName];
  }

  set(update: UserPorps): void {
    Object.assign(this.data, update);
  }

  on(event: string, callback: Callback) {

  };
}
