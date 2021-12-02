import User, { UserProps } from '../models/User';
import View from './View';

export default class UserFrom extends View<User, UserProps> {
  eventsMap = (): { [key: string]: () => void } => {
    return {
      'click:#random-age': this.onSetAgeClick,
      'click:#set-name': this.onSetNameClick,
      'click:#save': this.onSaveClick,
    };
  }
  template = (): string => {
    return `
    <div>
      <input placeholder="${this.model.get('name')}" />
      <button id="set-name">Change name</button>
      <br />
      <button id="random-age">Set random age</button>
      <button id="save">Save user</button>
    </div>
    `;
  };

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onSaveClick = (): void => {
    this.model.save();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');

    input ? this.model.set({ name: input.value }) : '';
  };
}
