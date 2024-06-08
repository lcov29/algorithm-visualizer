export interface IBaseEvent<Name extends string> {
  name: Name;
  creationTime: number;
}

export class BaseEvent<Name extends string> implements IBaseEvent<Name> {
  private _name: Name;
  private _creationTime: number;

  constructor(name: Name) {
    this._name = name;
    this._creationTime = Date.now();
  }

  get name() {
    return this._name;
  }

  get creationTime() {
    return this._creationTime;
  }
}
