import { GraphRenderEvent } from '@algorithm-visualizer/graph-contract';

import { GraphDefinitionMermaidParser } from '../../src/view/graph-definition-mermaid-parser';

function buildMockGraphCreatedEvent() {
  const mockNodeList = [
    { id: 0, label: 'A' },
    { id: 1, label: 'B' },
    { id: 2, label: 'C' },
  ];
  const mockEdgeList = [
    { id: 0, startNodeId: 0, endNodeId: 1, isDirected: true, weight: 4 },
    { id: 1, startNodeId: 1, endNodeId: 2, isDirected: false },
  ];

  return new GraphRenderEvent({
    nodes: mockNodeList,
    edges: mockEdgeList,
  });
}

describe('GraphDefinitionMermaidParser', () => {
  const parser = new GraphDefinitionMermaidParser();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('parse()', () => {
    it('parses the specified graph into a valid mermaid flowchart definition', () => {
      const graph = parser.parse({
        event: buildMockGraphCreatedEvent(),
        graphRenderDirection: 'LR',
      });
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
