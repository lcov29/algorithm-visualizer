import { GraphRenderDirection } from '@algorithm-visualizer/graph-contract';

import { GraphRenderDirectionMap } from '../../src/view/graph-render-direction-map';

describe('GraphRenderDirectionMap', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it.each([
    ['LR', 'Left-To-Right'],
    ['RL', 'Right-To-Left'],
    ['TB', 'Top-To-Bottom'],
    ['BT', 'Bottom-To-Top'],
  ])('returns the expected value "%s" for key "%s"', (value, key) => {
    expect(GraphRenderDirectionMap.get(key as GraphRenderDirection)).toBe(
      value,
    );
  });
});
