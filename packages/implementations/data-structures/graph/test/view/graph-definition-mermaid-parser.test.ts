import {
  GraphCreatedEvent,
  IEdgeList,
  INodeList,
} from '@algorithm-visualizer/graph-contract';

import { GraphDefinitionMermaidParser } from '../../src/view/graph-definition-mermaid-parser';

function buildMockGraphCreatedEvent() {
  const mockNodeList = { nodeIds: [0, 1, 2] } as INodeList;
  const mockEdgeList = {
    edges: [
      { id: 0, startNodeId: 0, endNodeId: 1, isDirected: true, weight: 4 },
      { id: 1, startNodeId: 1, endNodeId: 2, isDirected: false },
    ],
  } as IEdgeList;

  return new GraphCreatedEvent({
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
        '0((0))',
        '1((1))',
        '2((2))',
        '0 -- 4 --> 1',
        '1 --- 2',
        '\n',
      ].join('\n');
      expect(graph).toEqual(expectedGraph);
    });
  });
});
