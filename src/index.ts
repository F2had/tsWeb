import UserList from './views/UserList';
import Collection from './models/Collection';
import User, { UserProps } from './models/User';
import CollectionView from './views/CollectionView';

const users = new Collection(
  'http://localhost:3000/users',
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

const root = document.getElementById('root');

users.on('change', () => {
  if (root) {
    new UserList(root, users).render();
  }
});

users.fetch();
