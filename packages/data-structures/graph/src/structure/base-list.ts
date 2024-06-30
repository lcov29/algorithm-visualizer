import { IEdge } from './edge-list';
import { INode } from './node-list';

export interface IBaseList<Item extends INode | IEdge> {
  readonly list: Item[];
  item: (id: number) => Item | null;
  add: (item: Omit<Item, 'id'>) => IBaseList<Item>;
  replace: (item: Item) => IBaseList<Item>;
  delete: (id: number) => IBaseList<Item>;
  [Symbol.iterator]: () => {
    next: () => { value?: Item; done: boolean };
  };
}

export class BaseList<Item extends INode | IEdge> implements IBaseList<Item> {
  private _items: Item[];
  private _nextAvailableItemId: number;

  constructor() {
    this._items = [];
    this._nextAvailableItemId = 0;
  }

  get list(): Item[] {
    return this._items.map(item => structuredClone(item));
  }

  item(id: number): Item | null {
    const item = this._items.find(item => item.id === id);
    return structuredClone(item) ?? null;
  }

  add(item: Omit<Item, 'id'>): BaseList<Item> {
    const newItem = { id: this._nextAvailableItemId++, ...item } as Item;
    this._items.push(newItem);
    return this;
  }

  replace(item: Item): BaseList<Item> {
    const replaceItem = (id: number) => (this._items[id] = item);
    this._executeFunctionForListEntry(item.id, replaceItem);
    return this;
  }

  delete(id: number): BaseList<Item> {
    const deleteIndex = (id: number) => this._items.splice(id, 1);
    this._executeFunctionForListEntry(id, deleteIndex);
    return this;
  }

  private _executeFunctionForListEntry(
    id: number,
    action: (id: number) => void,
  ) {
    const itemIndex = this._items.findIndex(item => item.id === id);
    const itemExists = itemIndex > -1;
    if (itemExists) {
      action(itemIndex);
    }
  }

  [Symbol.iterator]() {
    let index = 0;

    return {
      next: () => {
        if (index < this._items.length) {
          return { value: this._items[index++], done: false };
        }
        return { done: true };
      },
    };
  }
}
