export interface IStack<Data> {
  push: (element: Data) => void;
  pop: () => Data | null;
  top: () => Data | null;
  flush: () => Data[];
  clear: () => void;
  getLength: () => number;
  getLimit: () => number;
  isEmpty: () => boolean;
  isFull: () => boolean;
}
