import {
  RandomIntegerGenerator,
  RandomListItemSelector,
} from '@algorithm-visualizer/random';

import { IEdge } from '../structure/edge-list';
import { INode } from '../structure/node-list';
import { IGraphGeneratorConfig } from './configuration';

export interface EdgeNode extends INode {
  availableEdgePointAmount: number;
}

export interface IEdgeGenerator {
  generateRandomEdges(): Omit<IEdge, 'id'>[];
}

export interface EdgeGeneratorArgs {
  config: IGraphGeneratorConfig;
  nodes: INode[];
  getRandomIntegerBetween: RandomIntegerGenerator;
  getRandomListItem: RandomListItemSelector;
}

export class EdgeGenerator implements IEdgeGenerator {
  private _getRandomIntegerBetween: RandomIntegerGenerator;
  private _getRandomListItem: RandomListItemSelector;
  private _config: IGraphGeneratorConfig;
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
  }

  private _initializeAvailableEdgePointAmounts() {
    const { min, max } = this._config.edgeAmountPerNode;

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
  }

  private _correctInvalidEdgePointAmountForNonRecursiveGraph() {
    // Prevent non recursive graphs from having a node A with an available
    // edge point amount that exceeds the total of available edge point
    // amounts of all other nodes. Otherwise node A would be forces to
    // connect with itself after it has consumed the available edge points
    // of all other nodes.
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
  }

  private _createMinimalEdgesConnectingAllNodes() {
    for (let i = 0; i < this._nodes.length - 1; i++) {
      const startNode = this._nodes[i];
      const endNode = this._nodes[i + 1];
      this._createEdgeBetween(startNode, endNode);
      startNode.availableEdgePointAmount--;
      endNode.availableEdgePointAmount--;
    }
  }

  private _selectRandomStartNode() {
    let candidates = this._getNodesWithDescendingEdgePointAmount();

    if (!this._config.allowRecursiveEdges) {
      const maximumEdgePointAmount = candidates.at(0)!.availableEdgePointAmount;
      candidates = candidates.filter(
        node => node.availableEdgePointAmount === maximumEdgePointAmount,
      );
    }

    const startNode = this._getRandomListItem(candidates)!;
    startNode.availableEdgePointAmount--;
    return startNode;
  }

  private _selectRandomEndNodeFor(startNode: EdgeNode) {
    let candidates = this._getNodesWithDescendingEdgePointAmount();

    if (!this._config.allowRecursiveEdges) {
      candidates = candidates.filter(node => node.id !== startNode.id);
      const maximumEdgePointAmount = candidates.at(0)!.availableEdgePointAmount;
      candidates = candidates.filter(
        node => node.availableEdgePointAmount === maximumEdgePointAmount,
      );
    }

    const endNode = this._getRandomListItem(candidates)!;
    endNode.availableEdgePointAmount--;
    return endNode;
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
    const { min, max } = this._config.edgeWeight!;
    this._edges.forEach(
      edge => (edge.weight = this._getRandomIntegerBetween(min, max)),
    );
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
}
