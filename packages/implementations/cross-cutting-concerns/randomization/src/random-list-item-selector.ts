import { IListValidator } from '../../../../contracts/cross-cutting-concerns/data-validation';
import { InvalidArgumentError } from '../../../../contracts/cross-cutting-concerns/error-handling';

interface getRandomListItemArgs<T> {
  list: T[];
  validator: IListValidator;
}

/**
 * Returns a random list item or null if the list is empty.
 *
 * @throws InvalidArgumentError
 */
export const getRandomListItem = <T>(args: getRandomListItemArgs<T>) => {
  const { list, validator } = args;

  if (!validator.isList(list)) {
    throw new InvalidArgumentError({
      message: 'Argument list is not an array',
      args: [list],
    });
  }

  const randomListIndex = Math.floor(list.length * Math.random());
  return list.at(randomListIndex) ?? null;
};
