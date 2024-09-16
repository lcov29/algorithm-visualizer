import {
  DirectionOption,
  GraphGeneratorConfig,
  IGeneratedEdge,
  IGeneratedNode,
} from '@algorithm-visualizer/graph-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';

import { EdgeGenerator } from '../../src/generator/edge-generator';

function getMockGeneratedNodes(): IGeneratedNode[] {
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];
}

function getMockConfig(
  args: Partial<GraphGeneratorConfig> = {},
): GraphGeneratorConfig {
  return new GraphGeneratorConfig({
    nodeAmount: new IntegerRange({ min: 2, max: 10 }),
    edgeAmountPerNode: new IntegerRange({ min: 2, max: 3 }),
    edgeWeight: new IntegerRange({ min: 1, max: 2 }),
    edgeDirection: 'unidirectional',
    allowRecursiveEdges: false,
    ...args,
  });
}

function mockGetRandomIntegerBetween(min: number, max: number) {
  return Math.floor(min + (max - min + 1) * Math.random());
}

function mockGetRandomListItem<T>(list: T[]) {
  const randomListIndex = Math.floor(list.length * Math.random());
  return list.at(randomListIndex) ?? null;
}

function buildEdgeGenerator(nodes: IGeneratedNode[]): EdgeGenerator {
  return new EdgeGenerator({
    getRandomIntegerBetween: mockGetRandomIntegerBetween,
    getRandomListItem: mockGetRandomListItem,
    nodes,
  });
}

function getReachableNeighborNodeIdsFor(
  node: IGeneratedNode,
  edges: IGeneratedEdge[],
) {
  return edges
    .filter(({ startNodeId, endNodeId, isDirected }) => {
      const isNodeInvolved = [startNodeId, endNodeId].includes(node.id);
      const isSpecifiedNodeStart = node.id === startNodeId;
      return isNodeInvolved && (isSpecifiedNodeStart || !isDirected);
    })
    .map(({ startNodeId, endNodeId, isDirected }) => {
      if (isDirected) {
        return { id: endNodeId };
      }
      const isSpecifiedNodeStart = node.id === startNodeId;
      return { id: isSpecifiedNodeStart ? endNodeId : startNodeId };
    });
}

function isGraphConnected(
  edges: IGeneratedEdge[],
  nodes: IGeneratedNode[],
): boolean {
  if (!edges.length || !nodes.length) {
    return false;
  }

  const isEachNodeConnected = nodes.every(node =>
    edges.some(edge => [edge.startNodeId, edge.endNodeId].includes(node.id)),
  );

  if (!isEachNodeConnected) {
    return false;
  }

  const startNodeId = nodes[0].id!;
  const reachedNodes = new Set<number>([startNodeId]);

  nodes.forEach(node => {
    const neighborNodes = getReachableNeighborNodeIdsFor(node, edges);
    neighborNodes.forEach(neighborNode => reachedNodes.add(neighborNode.id));
  });

  return nodes.length === reachedNodes.size;
}

function isEdgeAmountPerNodeBetween(
  edges: IGeneratedEdge[],
  range: IntegerRange,
) {
  const edgeAmountNodeMap = new Map<number, number>();

  edges.forEach(({ startNodeId, endNodeId }) => {
    const currentStartNodeEdgeAmount = edgeAmountNodeMap.get(startNodeId) ?? 0;
    const currentEndNodeEdgeAmount = edgeAmountNodeMap.get(endNodeId) ?? 0;
    edgeAmountNodeMap.set(startNodeId, currentStartNodeEdgeAmount + 1);
    edgeAmountNodeMap.set(endNodeId, currentEndNodeEdgeAmount + 1);
  });

  for (const edgeAmountPerNode of edgeAmountNodeMap.values()) {
    const isEdgeAmountPerNodeWithinRange =
      edgeAmountPerNode >= range.min && edgeAmountPerNode <= range.max;
    if (!isEdgeAmountPerNodeWithinRange) {
      return false;
    }
  }

  return true;
}

function isEdgeWeightBetween(edges: IGeneratedEdge[], range: IntegerRange) {
  return edges.every(
    ({ weight }) => weight && weight >= range.min && weight <= range.max,
  );
}

function isEdgeDirectionEqual(
  edges: IGeneratedEdge[],
  direction: DirectionOption,
) {
  return edges.every(
    ({ isDirected }) => isDirected === (direction === 'unidirectional'),
  );
}

function hasRecursiveEdges(edges: IGeneratedEdge[]) {
  return edges.some(({ startNodeId, endNodeId }) => startNodeId === endNodeId);
}

describe('EdgeGenerator', () => {
  let edgeGenerator: EdgeGenerator;
  const mockGetRandomIntegerBetween = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('generateRandomEdges()', () => {
    it.each([
      [
        'generates a valid random edge list that allows recursive edges',
        { allowRecursiveEdges: true } as Partial<GraphGeneratorConfig>,
      ],
      [
        'generates a valid random edge list without recursive edges',
        { allowRecursiveEdges: false } as Partial<GraphGeneratorConfig>,
      ],
      [
        'generates a valid random edge list with bidirectional edges',
        { edgeDirection: 'unidirectional' } as Partial<GraphGeneratorConfig>,
      ],
      [
        'generates a valid random edge list with bidirectional edges',
        { edgeDirection: 'bidirectional' } as Partial<GraphGeneratorConfig>,
      ],
    ])('%s', (_, configValues) => {
      for (let i = 0; i < 1_000; i++) {
        const nodes = getMockGeneratedNodes();
        const config = getMockConfig(configValues);

        edgeGenerator = buildEdgeGenerator(nodes);
        const edges = edgeGenerator.generateRandomEdges(config);

        expect(isGraphConnected(edges, nodes)).toBe(true);
        expect(
          isEdgeAmountPerNodeBetween(edges, config.edgeAmountPerNode),
        ).toBe(true);
        expect(isEdgeWeightBetween(edges, config.edgeWeight!)).toBe(true);
        expect(isEdgeDirectionEqual(edges, config.edgeDirection)).toBe(true);
        if (!config.allowRecursiveEdges) {
          expect(hasRecursiveEdges(edges)).toBe(false);
        }
      }
    });

    it('prevents situations where it would be forced to return at least one recursive edge despite the configuration forbidding it', () => {
      mockGetRandomIntegerBetween.mockReturnValueOnce(5).mockReturnValue(1);

      const nodes = getMockGeneratedNodes();
      const config = getMockConfig({
        allowRecursiveEdges: false,
        edgeAmountPerNode: new IntegerRange({ min: 1, max: 5 }),
      });

      const generator = new EdgeGenerator({
        getRandomIntegerBetween: mockGetRandomIntegerBetween,
        getRandomListItem: mockGetRandomListItem,
        nodes,
      });
      const edges = generator.generateRandomEdges(config);

      expect(isGraphConnected(edges, nodes)).toBe(true);
      expect(isEdgeAmountPerNodeBetween(edges, config.edgeAmountPerNode)).toBe(
        true,
      );
      expect(isEdgeWeightBetween(edges, config.edgeWeight!)).toBe(true);
      expect(isEdgeDirectionEqual(edges, 'unidirectional'));
      expect(hasRecursiveEdges(edges)).toBe(false);
    });
  });
});
