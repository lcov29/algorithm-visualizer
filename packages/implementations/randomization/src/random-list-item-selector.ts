import { IListValidator } from '@algorithm-visualizer/data-validation-contract';
import { InvalidArgumentError } from '@algorithm-visualizer/error-handling-contract';

interface getRandomListItemArgs<T> {
  list: T[];
  validator: IListValidator;
}

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
