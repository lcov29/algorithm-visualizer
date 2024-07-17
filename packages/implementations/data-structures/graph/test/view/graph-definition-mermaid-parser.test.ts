import {
  GraphCreatedEvent,
  IEdgeList,
} from '@algorithm-visualizer/graph-contract';
import { INodeList } from '@algorithm-visualizer/graph-contract';

import { GraphDefinitionMermaidParser } from '../../src/view/graph-definition-mermaid-parser';

function buildMockGraphCreatedEvent() {
  const mockNodeList = {
    list: [
      { id: 0, label: 'A' },
      { id: 1, label: 'B' },
      { id: 2, label: 'C' },
    ],
  } as INodeList;

  const mockEdgeList = {
    list: [
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
  let parsedGraph: string;

  beforeEach(() => {
    const parser = new GraphDefinitionMermaidParser();
    parsedGraph = parser.parse({
      event: buildMockGraphCreatedEvent(),
      graphRenderDirection: 'LR',
    });
  });

  describe('parse()', () => {
    it('parses the specified graph into a valid mermaid flowchart definition', () => {
      const expectedGraph = [
        '%%{ init: { flowchart: { curve: "linear" } } }%%',
        'flowchart LR',
        '0((A))',
        '1((B))',
        '2((C))',
        '0 -- 4 --> 1',
        '1 --- 2',
        '\n',
      ].join('\n');
      expect(parsedGraph).toEqual(expectedGraph);
    });
  });
});
