import { GraphGeneratorConfig } from '@algorithm-visualizer/graph-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';

import { NodeGenerator } from '../../src/generator/node-generator';

const getRandomIntegerBetween = jest.fn();

describe('generateRandomNodes()', () => {
  let config: GraphGeneratorConfig;
  let nodeGenerator: NodeGenerator;

  beforeEach(() => {
    jest.resetAllMocks();

    config = {
      nodeAmount: new IntegerRange({ min: 4, max: 6 }),
    } as Partial<GraphGeneratorConfig> as GraphGeneratorConfig;

    nodeGenerator = new NodeGenerator({
      config,
      getRandomIntegerBetween,
    });
  });

  it('calls the random integer function with the specified node amount ranges', () => {
    nodeGenerator.generateRandomNodes();
    expect(getRandomIntegerBetween).toHaveBeenCalledWith(4, 6);
  });

  it('returns a list of nodes with alphabetical ascending labels', () => {
    getRandomIntegerBetween.mockReturnValue(4);
    const nodes = nodeGenerator.generateRandomNodes();
    expect(nodes).toEqual([
      { label: 'A' },
      { label: 'B' },
      { label: 'C' },
      { label: 'D' },
    ]);
  });
});
