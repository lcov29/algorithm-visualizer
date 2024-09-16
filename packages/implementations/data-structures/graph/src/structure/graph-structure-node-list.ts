import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { IGraphStructureNodeList } from '@algorithm-visualizer/graph-contract';

interface IGraphStructureNodeListArgs {
  nodeIds: number[];
  nextAvailableNodeId: number;
}

/**
 * Data structure representing the nodes of a {@link Graph}.
 */
export class GraphStructureNodeList implements IGraphStructureNodeList {
  private _nodeIds: number[];
  private _nextAvailableNodeId: number;

  constructor(args?: IGraphStructureNodeListArgs) {
    this._nodeIds = args?.nodeIds ?? [];
    this._nextAvailableNodeId = args?.nextAvailableNodeId ?? 0;
  }

  get nodeIds(): number[] {
    return this._nodeIds.map(nodeId => nodeId);
  }

  set nodeIds(nodeIds: number[]) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property nodeIds is forbidden',
    });
  }

  addNode(): number {
    const newNodeId = this._nextAvailableNodeId++;
    this._nodeIds.push(newNodeId);
    return newNodeId;
  }

  deleteNode(id: number): GraphStructureNodeList {
    this._nodeIds = this._nodeIds.filter(nodeId => nodeId !== id);
    return this;
  }

  hasNode(id: number): boolean {
    return this._nodeIds.some(nodeId => nodeId === id);
  }

  clone() {
    return new GraphStructureNodeList({
      nodeIds: structuredClone(this._nodeIds),
      nextAvailableNodeId: this._nextAvailableNodeId,
    });
  }

  [Symbol.iterator]() {
    let index = 0;

    return {
      next: () => {
        if (index < this._nodeIds.length) {
          return { value: this._nodeIds[index++], done: false };
        }
        return { done: true };
      },
    };
  }
}
