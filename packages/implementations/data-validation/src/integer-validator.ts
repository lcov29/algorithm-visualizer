import { IIntegerValidator } from '@algorithm-visualizer/data-validation-contract';

export class IntegerValidator implements IIntegerValidator {
  isValidInteger(input: number): boolean {
    return Number.isInteger(input);
  }

  isValidPositiveInteger(input: number): boolean {
    return Number.isInteger(input) && input > 0;
  }

  isValidNonNegativeInteger(input: number): boolean {
    return Number.isInteger(input) && input >= 0;
  }

  isValidNegativeInteger(input: number): boolean {
    return Number.isInteger(input) && input < 0;
  }
}
