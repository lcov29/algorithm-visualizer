import { IListValidator } from '@algorithm-visualizer/data-validation-contract';

export class ListValidator implements IListValidator {
  isList<T>(input: T[]) {
    return Array.isArray(input);
  }

  isEmptyList<T>(input: T[]): boolean {
    return Array.isArray(input) && input.length === 0;
  }
}
