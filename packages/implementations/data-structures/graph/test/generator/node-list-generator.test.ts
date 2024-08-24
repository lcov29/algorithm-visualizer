import { GraphGeneratorConfig } from '@algorithm-visualizer/graph-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';
import { RandomIntegerGenerator } from '@algorithm-visualizer/randomization-contract';

import { generateRandomNodeList } from '../../src/generator/node-list-generator';

describe('generateRandomNodeList()', () => {
  const config = {
    nodeAmount: new IntegerRange({ min: 4, max: 6 }),
  } as Partial<GraphGeneratorConfig> as GraphGeneratorConfig;

  const getRandomIntegerBetween: RandomIntegerGenerator = (
    min: number,
    max: number,
  ) => max;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns a list of ascending node Ids', () => {
    const nodeList = generateRandomNodeList({
      config,
      getRandomIntegerBetween,
    });
    expect(nodeList.nodeIds).toEqual([0, 1, 2, 3, 4, 5]);
  });
});
