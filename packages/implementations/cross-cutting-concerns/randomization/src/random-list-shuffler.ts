import { IListValidator } from '@algorithm-visualizer/data-validation-contract';
import { InvalidArgumentError } from '@algorithm-visualizer/error-handling-contract';

function swapListElements<T>(
  list: T[],
  indices: { indexA: number; indexB: number },
) {
  const { indexA, indexB } = indices;
  const valueA = list[indexA];
  list[indexA] = list[indexB];
  list[indexB] = valueA;
}

interface IGetRandomShuffledList<T> {
  list: T[];
  validator: IListValidator;
}

/**
 * Returns a randomly shuffled copy of the specified list
 *
 * @throws InvalidArgumentError
 */
export function getRandomShuffledList<T>(args: IGetRandomShuffledList<T>) {
  const { list, validator } = args;

  if (!validator.isList(list)) {
    throw new InvalidArgumentError({
      message: 'Argument list is not an array',
      args: [list],
    });
  }

  const listClone = list.map(value => value);

  for (let i = 0; i < listClone.length; i++) {
    const randomSwapValueIndex = Math.floor(listClone.length * Math.random());
    swapListElements(listClone, { indexA: i, indexB: randomSwapValueIndex });
  }

  const hasCloneSameOrderAsOriginal = listClone.every(
    (value, index) => list[index] === value,
  );
  if (hasCloneSameOrderAsOriginal) {
    swapListElements(listClone, { indexA: 0, indexB: listClone.length - 1 });
  }

  return listClone;
}
