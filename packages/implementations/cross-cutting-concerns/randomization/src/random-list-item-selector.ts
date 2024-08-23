import { IListValidator } from '@algorithm-visualizer/data-validation-contract';
import { InvalidArgumentError } from '@algorithm-visualizer/error-handling-contract';

interface IGetRandomListItemArgs<T> {
  list: T[];
  validator: IListValidator;
}

/**
 * Returns a random list item or null if the list is empty.
 *
 * @throws InvalidArgumentError
 */
export const getRandomListItem = <T>(args: IGetRandomListItemArgs<T>) => {
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
