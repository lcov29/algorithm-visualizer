import {
  GraphRenderDirection,
  GraphViewInitializedEvent,
} from '@algorithm-visualizer/graph-contract';

import { GraphMermaidDefinitionParser } from '../../src/view/graph-mermaid-definition-parser';

function buildMockGraphRenderedEvent() {
  const mockNodeList = [
    { id: 0, label: 'A' },
    { id: 1, label: 'B' },
    { id: 2, label: 'C' },
  ];
  const mockEdgeList = [
    { id: 0, startNodeId: 0, endNodeId: 1, isDirected: true, weight: 4 },
    { id: 1, startNodeId: 1, endNodeId: 2, isDirected: false },
  ];

  const mockRenderDirection: GraphRenderDirection = 'Left-To-Right';

  return new GraphViewInitializedEvent({
    nodes: mockNodeList,
    edges: mockEdgeList,
    renderDirection: mockRenderDirection,
  });
}

describe('GraphMermaidDefinitionParser', () => {
  const parser = new GraphMermaidDefinitionParser();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('parse()', () => {
    it('parses the specified graph into a valid mermaid flowchart definition', () => {
      const graph = parser.parse(buildMockGraphRenderedEvent());
      const expectedGraph = [
        '%%{ init: { "flowchart": { "curve": "monotoneX" } } }%%',
        'flowchart LR',
        '0((A))',
        '1((B))',
        '2((C))',
        '0 -- 4 --> 1',
        '1 --- 2',
        '\n',
      ].join('\n');
      expect(graph).toEqual(expectedGraph);
    });
  });
});
