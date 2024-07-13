import {
  GraphGeneratorConfig,
  IEdge,
  INode,
} from '@algorithm-visualizer/graph-contract';
import {
  IRandomIntegerGenerator,
  IRandomListItemSelector,
} from '@algorithm-visualizer/randomization-contract';

import { EdgeGeneratorError } from './edge-generator-error';

export interface EdgeNode extends INode {
  availableEdgePointAmount: number;
}

export interface IEdgeGenerator {
  generateRandomEdges(): Omit<IEdge, 'id'>[];
}

export interface EdgeGeneratorArgs {
  config: GraphGeneratorConfig;
  nodes: INode[];
  getRandomIntegerBetween: IRandomIntegerGenerator;
  getRandomListItem: IRandomListItemSelector;
}

export class EdgeGenerator implements IEdgeGenerator {
  private _getRandomIntegerBetween: IRandomIntegerGenerator;
  private _getRandomListItem: IRandomListItemSelector;
  private _config: GraphGeneratorConfig;
  private _nodes: EdgeNode[];
  private _edges: Omit<IEdge, 'id'>[] = [];

  constructor(args: EdgeGeneratorArgs) {
    this._getRandomIntegerBetween = args.getRandomIntegerBetween;
    this._getRandomListItem = args.getRandomListItem;
    this._config = args.config;
    this._nodes = args.nodes.map(node => ({
      ...node,
      availableEdgePointAmount: 0,
    }));
  }

  generateRandomEdges(): Omit<IEdge, 'id'>[] {
    try {
      this._initializeAvailableEdgePointAmounts();

      if (!this._config.allowRecursiveEdges) {
        this._correctInvalidEdgePointAmountForNonRecursiveGraph();
      }

      this._createMinimalEdgesConnectingAllNodes();

      while (this._getAvailableEdgePointsTotal() > 0) {
        const startNode = this._selectRandomStartNode()!;
        const endNode = this._selectRandomEndNodeFor(startNode)!;
        this._createEdgeBetween(startNode, endNode);
      }

      if (this._config.edgeWeight) {
        this._addRandomEdgeWeights();
      }

      return this._edges;
    } catch (error) {
      this._throwEdgeGeneratorError(
        'Failed to generate random edges according to the passed configuration',
        error,
      );
      return [];
    }
  }

  private _initializeAvailableEdgePointAmounts() {
    try {
      const min = this._config.edgeAmountPerNode.min;
      const max = this._config.edgeAmountPerNode.max;

      this._nodes.forEach(node => {
        node.availableEdgePointAmount = this._getRandomIntegerBetween(min, max);
      });

      const availableEdgePointTotal = this._getAvailableEdgePointsTotal();
      const isEdgePointsTotalOdd = availableEdgePointTotal % 2 > 0;

      if (isEdgePointsTotalOdd) {
        // ensure that the total amount of available edge points is even,
        // because every edge requires two edge points (start and end)
        const lastEdge = this._nodes.at(-1)!;
        const summand = lastEdge.availableEdgePointAmount < max ? 1 : -1;
        lastEdge.availableEdgePointAmount += summand;
      }
    } catch (error) {
      this._throwEdgeGeneratorError(
        'Failed to initialize the available edge point amounts',
        error,
      );
    }
  }

  private _correctInvalidEdgePointAmountForNonRecursiveGraph() {
    try {
      // Prevent non recursive graphs from having a node A with an available
      // edge point amount that exceeds the total of available edge point
      // amounts of all other nodes. Otherwise node A would be forced to
      // connect with itself after it has consumed the available edge points
      // of all the other nodes.
      const availableEdgePointTotal = this._getAvailableEdgePointsTotal();
      const nodeWithEdgePointAmountGreaterThanEdgePointTotalOfAllOtherNodes =
        this._nodes.find(
          node =>
            availableEdgePointTotal - node.availableEdgePointAmount <
            availableEdgePointTotal / 2,
        );

      if (nodeWithEdgePointAmountGreaterThanEdgePointTotalOfAllOtherNodes) {
        nodeWithEdgePointAmountGreaterThanEdgePointTotalOfAllOtherNodes.availableEdgePointAmount -= 2;
      }
    } catch (error) {
      this._throwEdgeGeneratorError(
        'Failed to correct invalid edge point amount for non recursive graph',
        error,
      );
    }
  }

  private _createMinimalEdgesConnectingAllNodes() {
    try {
      for (let i = 0; i < this._nodes.length - 1; i++) {
        const startNode = this._nodes[i];
        const endNode = this._nodes[i + 1];
        this._createEdgeBetween(startNode, endNode);
        startNode.availableEdgePointAmount--;
        endNode.availableEdgePointAmount--;
      }
    } catch (error) {
      this._throwEdgeGeneratorError(
        'Failed to create minimal edges connecting all nodes',
        error,
      );
    }
  }

  private _selectRandomStartNode() {
    try {
      let candidates = this._getNodesWithDescendingEdgePointAmount();

      if (!this._config.allowRecursiveEdges) {
        const maximumEdgePointAmount =
          candidates.at(0)!.availableEdgePointAmount;
        candidates = candidates.filter(
          node => node.availableEdgePointAmount === maximumEdgePointAmount,
        );
      }

      const startNode = this._getRandomListItem(candidates)!;
      startNode.availableEdgePointAmount--;
      return startNode;
    } catch (error) {
      this._throwEdgeGeneratorError(
        'Failed to select a random start node',
        error,
      );
    }
  }

  private _selectRandomEndNodeFor(startNode: EdgeNode) {
    try {
      let candidates = this._getNodesWithDescendingEdgePointAmount();

      if (!this._config.allowRecursiveEdges) {
        candidates = candidates.filter(node => node.id !== startNode.id);
        const maximumEdgePointAmount =
          candidates.at(0)!.availableEdgePointAmount;
        candidates = candidates.filter(
          node => node.availableEdgePointAmount === maximumEdgePointAmount,
        );
      }

      const endNode = this._getRandomListItem(candidates)!;
      endNode.availableEdgePointAmount--;
      return endNode;
    } catch (error) {
      this._throwEdgeGeneratorError(
        'Failed to select a random end node',
        error,
      );
    }
  }

  private _getNodesWithDescendingEdgePointAmount() {
    return this._nodes
      .filter(node => node.availableEdgePointAmount > 0)
      .toSorted(
        (nodeA, nodeB) =>
          nodeB.availableEdgePointAmount - nodeA.availableEdgePointAmount,
      );
  }

  private _addRandomEdgeWeights() {
    try {
      const { min, max } = this._config.edgeWeight!;

      this._edges.forEach(
        edge => (edge.weight = this._getRandomIntegerBetween(min, max)),
      );
    } catch (error) {
      this._throwEdgeGeneratorError('Failed to add random edge weights', error);
    }
  }

  private _createEdgeBetween(startNode: EdgeNode, endNode: EdgeNode) {
    this._edges.push({
      startNodeId: startNode.id,
      endNodeId: endNode.id,
      isDirected: this._config.edgeDirection === 'unidirectional',
    });
  }

  private _getAvailableEdgePointsTotal() {
    return this._nodes
      .map(node => node.availableEdgePointAmount)
      .reduce((sum, currentEdgeAmount) => sum + currentEdgeAmount);
  }

  private _throwEdgeGeneratorError(message: string, cause: unknown) {
    throw new EdgeGeneratorError({
      message,
      config: this._config,
      nodes: this._nodes,
      cause: cause as Error,
    });
  }
}
