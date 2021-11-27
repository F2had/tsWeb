import Model from './Model';
import Attributes from './Attributes';
import ApiSync from './ApiSync';
import { Eventing } from './Eventing';
import Collection from './Collection';

export interface UserPorps {
  name?: string;
  age?: number;
  id?: number;
}
const url = 'http://localhost:3000/users';
export default class User extends Model<UserPorps> {
  static buildUser(attrs: UserPorps): User {
    return new User(
      new Attributes<UserPorps>(attrs),
      new Eventing(),
      new ApiSync<UserPorps>(url)
    );
  }
  static getUsers = (): Collection<User, UserPorps> => {
    return new Collection<User, UserPorps>(url, (json: UserPorps) =>
      User.buildUser(json)
    );
  };
}
