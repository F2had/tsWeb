import Model from './Model';
import Attributes from './Attributes';
import ApiSync from './ApiSync';
import { Eventing } from './Eventing';
import Collection from './Collection';

export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}
const url = 'http://localhost:3000/users';
export default class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(url)
    );
  }
  static getUsers = (): Collection<User, UserProps> => {
    return new Collection<User, UserProps>(url, (json: UserProps) =>
      User.buildUser(json)
    );
  };

  setRandomAge = (): void => {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  };
}
