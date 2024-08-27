export abstract class BaseEvent<Name extends string> {
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
