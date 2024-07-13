import {
  IRandomBooleanGenerator,
  IRandomIntegerGenerator,
  IRandomListItemSelector,
} from '../../../../contracts/cross-cutting-concerns/randomization';
import { IntegerValidator, ListValidator } from '../../data-validation';
import { getRandomBoolean as _getRandomBoolean } from './random-boolean-generator';
import { getRandomIntegerBetween as _getRandomIntegerBetween } from './random-integer-generator';
import { getRandomListItem as _getRandomListItem } from './random-list-item-selector';

/**
 * Generates a random boolean.
 *
 * @param {number} probabilityTrueInPercent - Integer between 0 and 100
 *
 * @throws InvalidArgumentError
 */
export const getRandomBoolean: IRandomBooleanGenerator = (
  probabilityTrueInPercent: number,
) =>
  _getRandomBoolean({
    probabilityTrueInPercent,
    validator: new IntegerValidator(),
  });

/**
 * Generates a random integer within the specified range.
 *
 * @param {number} min Lower range boundary (inclusive).
 * @param {number} max Upper range boundary (inclusive), greater or equal to {@link min}.
 *
 * @returns {number} Random integer between {@link min} and {@link max} (inclusive).
 *
 * @throws InvalidArgumentError
 */
export const getRandomIntegerBetween: IRandomIntegerGenerator = (
  min: number,
  max: number,
) => _getRandomIntegerBetween({ min, max, validator: new IntegerValidator() });

/**
 * Returns a random list item or null if the list is empty.
 *
 * @param {list} list
 *
 * @throws InvalidArgumentError
 */
export const getRandomListItem: IRandomListItemSelector = <T>(list: T[]) =>
  _getRandomListItem({ list, validator: new ListValidator() });
