import { GraphGeneratorConfig } from '@algorithm-visualizer/graph-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';
import { RandomIntegerGenerator } from '@algorithm-visualizer/randomization-contract';

import { NodeListGenerator } from '../../src/generator/node-list-generator';
import { NodeList } from '../../src/structure/node-list';

describe('NodeListGenerator()', () => {
  const mockConfig = {
    nodeAmount: new IntegerRange({ min: 4, max: 6 }),
  } as Partial<GraphGeneratorConfig> as GraphGeneratorConfig;

  const mockAddNode = jest.fn();

  const mockNodeList = {
    addNode: mockAddNode,
  } as Partial<NodeList> as NodeList;

  const mockGetRandomIntegerBetween: RandomIntegerGenerator = (
    min: number,
    max: number,
  ) => max;

  const nodeListGenerator = new NodeListGenerator({
    nodeList: mockNodeList,
    getRandomIntegerBetween: mockGetRandomIntegerBetween,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('NodeListGenerator', () => {
    it('returns a list of ascending node Ids', () => {
      nodeListGenerator.generateRandomNodeList(mockConfig);
      expect(mockAddNode).toHaveBeenCalledTimes(6);
    });
  });
});
