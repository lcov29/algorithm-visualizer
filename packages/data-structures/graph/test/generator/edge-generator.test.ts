import { IIntegerRange } from '@algorithm-visualizer/data-structures/integer-range';

import {
  DirectionOption,
  IGraphGeneratorConfig,
} from '../../src/generator/configuration';
import { EdgeGenerator } from '../../src/generator/edge-generator';
import { IEdge } from '../../src/structure/edge-list';
import { INode } from '../../src/structure/node-list';

function getMockNodes(): INode[] {
  return [
    { id: 0, label: 'A' },
    { id: 1, label: 'B' },
    { id: 2, label: 'C' },
    { id: 3, label: 'D' },
  ];
}

function getMockConfig(
  args: Partial<IGraphGeneratorConfig> = {},
): IGraphGeneratorConfig {
  return {
    nodeAmount: { min: 2, max: 10 },
    edgeAmountPerNode: { min: 2, max: 3 },
    edgeWeight: { min: 1, max: 2 },
    edgeDirection: 'unidirectional',
    allowRecursiveEdges: false,
    ...args,
  };
}

function getRandomIntegerBetween(min: number, max: number) {
  return Math.floor(min + (max - min + 1) * Math.random());
}

function getRandomListItem<T>(list: T[]) {
  const randomListIndex = Math.floor(list.length * Math.random());
  return list.at(randomListIndex) ?? null;
}

function buildEdgeGenerator(
  nodes: INode[],
  config: IGraphGeneratorConfig,
): EdgeGenerator {
  return new EdgeGenerator({
    nodes,
    config,
    getRandomIntegerBetween,
    getRandomListItem,
  });
}

function getReachableNeighborNodeIdsFor(
  nodeId: number,
  edges: Omit<IEdge, 'id'>[],
) {
  return edges
    .filter(({ startNodeId, endNodeId, isDirected }) => {
      const isNodeInvolved = [startNodeId, endNodeId].includes(nodeId);
      const isSpecifiedNodeStart = nodeId === startNodeId;
      return isNodeInvolved && (isSpecifiedNodeStart || !isDirected);
    })
    .map(({ startNodeId, endNodeId, isDirected }) => {
      if (isDirected) {
        return endNodeId;
      }
      const isSpecifiedNodeStart = nodeId === startNodeId;
      return isSpecifiedNodeStart ? endNodeId : startNodeId;
    });
}

function isNodeIdListEqual(listA: number[], listB: number[]) {
  if (listA.length !== listB.length) {
    return false;
  }
  listA.sort();
  listB.sort();
  return listA.every((item, index) => listB.at(index) === item);
}

function isGraphConnected(
  edges: Omit<IEdge, 'id'>[],
  nodeIds: number[],
): boolean {
  if (!edges.length || !nodeIds.length) {
    return false;
  }

  const isEachNodeConnected = nodeIds.every(nodeId =>
    edges.some(edge => [edge.startNodeId, edge.endNodeId].includes(nodeId)),
  );

  if (!isEachNodeConnected) {
    return false;
  }

  const startNodeId = nodeIds.at(0)!;
  const reachedNodeIds = new Set<number>([startNodeId]);
  const checkedNodeIds = new Set<number>([startNodeId]);
  const nodeIdsToCheck: number[] = [startNodeId];

  while (nodeIdsToCheck.length) {
    const checkNodeId = nodeIdsToCheck.shift()!;
    const neighborNodeIds = getReachableNeighborNodeIdsFor(
      checkNodeId,
      edges,
    ).filter(nodeId => !checkedNodeIds.has(nodeId));
    nodeIdsToCheck.push(...neighborNodeIds);
    neighborNodeIds.forEach(nodeId => reachedNodeIds.add(nodeId));
    checkedNodeIds.add(checkNodeId);

    const hasEveryNodeBeenReached = isNodeIdListEqual(nodeIds, [
      ...reachedNodeIds,
    ]);
    if (hasEveryNodeBeenReached) {
      break;
    }
  }

  return isNodeIdListEqual(nodeIds, [...reachedNodeIds]);
}

function isEdgeAmountPerNodeBetween(
  edges: Omit<IEdge, 'id'>[],
  range: IIntegerRange,
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

function isEdgeWeightBetween(edges: Omit<IEdge, 'id'>[], range: IIntegerRange) {
  return edges.every(
    ({ weight }) => weight && weight >= range.min && weight <= range.max,
  );
}

function isEdgeDirectionEqual(
  edges: Omit<IEdge, 'id'>[],
  direction: DirectionOption,
) {
  return edges.every(
    ({ isDirected }) => isDirected === (direction === 'unidirectional'),
  );
}

function hasRecursiveEdges(edges: Omit<IEdge, 'id'>[]) {
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
        { allowRecursiveEdges: true } as Partial<IGraphGeneratorConfig>,
      ],
      [
        'generates a valid random edge list without recursive edges',
        { allowRecursiveEdges: false } as Partial<IGraphGeneratorConfig>,
      ],
      [
        'generates a valid random edge list with bidirectional edges',
        { edgeDirection: 'unidirectional' } as Partial<IGraphGeneratorConfig>,
      ],
      [
        'generates a valid random edge list with bidirectional edges',
        { edgeDirection: 'bidirectional' } as Partial<IGraphGeneratorConfig>,
      ],
    ])('%s', (_, configValues) => {
      for (let i = 0; i < 1_000; i++) {
        const nodes = getMockNodes();
        const config = getMockConfig(configValues);

        edgeGenerator = buildEdgeGenerator(nodes, config);
        const edges = edgeGenerator.generateRandomEdges();
        const nodeIds = nodes.map(node => node.id);

        expect(isGraphConnected(edges, nodeIds)).toBe(true);
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

      const nodes = getMockNodes();
      const config = getMockConfig({
        allowRecursiveEdges: false,
        edgeAmountPerNode: { min: 1, max: 5 },
      });

      const generator = new EdgeGenerator({
        nodes,
        config,
        getRandomIntegerBetween: mockGetRandomIntegerBetween,
        getRandomListItem,
      });
      const edges = generator.generateRandomEdges();
      const nodeIds = getMockNodes().map(node => node.id);

      expect(isGraphConnected(edges, nodeIds)).toBe(true);
      expect(isEdgeAmountPerNodeBetween(edges, config.edgeAmountPerNode)).toBe(
        true,
      );
      expect(isEdgeWeightBetween(edges, config.edgeWeight!)).toBe(true);
      expect(isEdgeDirectionEqual(edges, 'unidirectional'));
      expect(hasRecursiveEdges(edges)).toBe(false);
    });
  });
});
