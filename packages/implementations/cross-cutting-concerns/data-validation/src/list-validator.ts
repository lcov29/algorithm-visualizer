import { IListValidator } from '../../../../contracts/cross-cutting-concerns/data-validation';

export class ListValidator implements IListValidator {
  isList<T>(input: T[]) {
    return Array.isArray(input);
  }

  isEmptyList<T>(input: T[]): boolean {
    return Array.isArray(input) && input.length === 0;
  }
}
