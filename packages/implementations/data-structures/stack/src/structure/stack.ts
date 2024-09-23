import { IStack, StackError } from '@algorithm-visualizer/stack-contract';

interface IStackArgs {
  limit?: number;
}

export class Stack<Data> implements IStack<Data> {
  private _elements: Data[];
  private _limit: number;

  constructor(args: IStackArgs = {}) {
    this._elements = [];
    this._limit = args.limit ?? Infinity;
  }

  push(element: Data) {
    if (this.isFull()) {
      throw new StackError({
        message: `Failed to push element to stack: Stack count would exceed the limit (${this._limit})`,
      });
    }
    this._elements.push(element);
  }

  pop() {
    return this._elements.pop() ?? null;
  }

  top() {
    return this._elements.at(-1) ?? null;
  }

  clear() {
    this._elements = [];
  }

  flush() {
    const currentElements = this._elements;
    this._elements = [];
    return currentElements;
  }

  isEmpty() {
    return this._elements.length === 0;
  }

  isFull() {
    return this._elements.length === this._limit;
  }

  getLength() {
    return this._elements.length;
  }

  getLimit() {
    return this._limit;
  }
}
