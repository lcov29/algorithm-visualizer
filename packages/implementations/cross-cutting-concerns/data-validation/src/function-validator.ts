import { IFunctionValidator } from '@algorithm-visualizer/data-validation-contract';

export class FunctionValidator implements IFunctionValidator {
  isFunction<T>(input: T): boolean {
    return typeof input === 'function';
  }
}
