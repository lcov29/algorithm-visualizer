import { GraphGeneratorConfig } from '@algorithm-visualizer/graph-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';
import { RandomIntegerGenerator } from '@algorithm-visualizer/randomization-contract';

import { NodeGenerator } from '../../src/generator/node-generator';

describe('NodeGenerator()', () => {
  const mockConfig = {
    nodeAmount: new IntegerRange({ min: 4, max: 6 }),
  } as Partial<GraphGeneratorConfig> as GraphGeneratorConfig;

  const mockGetRandomIntegerBetween: RandomIntegerGenerator = (
    min: number,
    max: number,
  ) => max;

  const nodeGenerator = new NodeGenerator({
    getRandomIntegerBetween: mockGetRandomIntegerBetween,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('NodeGenerator', () => {
    it('returns a list of ascending node Ids', () => {
      const nodes = nodeGenerator.generateRandomNodes(mockConfig);
      expect(nodes).toEqual([
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
      ]);
    });
  });
});
