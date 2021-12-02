import Model from '../models/Model';

export default abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  regiosnMap(): { [key: string]: string } {
    return {};
  }

  eventsMap = (): { [key: string]: () => void } => {
    return {};
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  bindEvents = (fragment: DocumentFragment): void => {
    const eventsMap = this.eventsMap();
    for (const eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  };

  mapRegions = (fragment: DocumentFragment): void => {
    const regionsMap = this.regiosnMap();

    for (const key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.getElementById(selector);
      element ? (this.regions[key] = element) : '';
    }
  };

  onRender = (): void => {};

  render = (): void => {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');

    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);
    this.onRender();
    
    this.parent.append(templateElement.content);
  };
}
