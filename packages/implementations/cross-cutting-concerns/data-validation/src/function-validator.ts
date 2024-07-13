import { IFunctionValidator } from '../../../../contracts/cross-cutting-concerns/data-validation';

export class FunctionValidator implements IFunctionValidator {
  isFunction<T>(input: T): boolean {
    return typeof input === 'function';
  }
}
