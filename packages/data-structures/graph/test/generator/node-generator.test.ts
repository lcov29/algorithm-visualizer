import { IGraphGeneratorConfig } from '../../src/generator/configuration';
import { NodeGenerator } from '../../src/generator/node-generator';

const getRandomIntegerBetween = jest.fn();

describe('generateRandomNodes()', () => {
  let config: IGraphGeneratorConfig;
  let nodeGenerator: NodeGenerator;

  beforeEach(() => {
    jest.resetAllMocks();

    config = {
      nodeAmount: { min: 4, max: 6 },
    } as Partial<IGraphGeneratorConfig> as IGraphGeneratorConfig;

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
