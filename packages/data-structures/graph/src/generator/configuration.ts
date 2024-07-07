import { IIntegerRange } from '@algorithm-visualizer/data-structures/integer-range';

export type DirectionOption = 'unidirectional' | 'bidirectional';

export interface IGraphGeneratorConfig {
  readonly nodeAmount: IIntegerRange;
  readonly edgeAmountPerNode: IIntegerRange;
  readonly edgeWeight: IIntegerRange | null;
  readonly edgeDirection: DirectionOption;
  readonly allowRecursiveEdges: boolean;
}

interface IGraphGeneratorConfigArgs {
  nodeAmount: IIntegerRange;
  edgeAmountPerNode: IIntegerRange;
  edgeWeight: IIntegerRange | null;
  edgeDirection: DirectionOption;
  allowRecursiveEdges: boolean;
}

export class GraphGeneratorConfig implements IGraphGeneratorConfig {
  private _nodeAmount: IIntegerRange;
  private _edgeAmountPerNode: IIntegerRange;
  private _edgeWeight: IIntegerRange | null;
  private _edgeDirection: DirectionOption;
  private _allowRecursiveEdges: boolean;

  constructor(args: IGraphGeneratorConfigArgs) {
    this._validate(args);
    this._nodeAmount = args.nodeAmount;
    this._edgeAmountPerNode = args.edgeAmountPerNode;
    this._edgeWeight = args.edgeWeight;
    this._edgeDirection = args.edgeDirection;
    this._allowRecursiveEdges = args.allowRecursiveEdges;
  }

  get nodeAmount() {
    return this._nodeAmount;
  }

  get edgeAmountPerNode() {
    return this._edgeAmountPerNode;
  }

  get edgeWeight() {
    return this._edgeWeight;
  }

  get edgeDirection() {
    return this._edgeDirection;
  }

  get allowRecursiveEdges() {
    return this._allowRecursiveEdges;
  }

  private _validate(args: IGraphGeneratorConfigArgs) {
    if (
      ['unidirectional', 'bidirectional', 'mixed'].includes(args.edgeDirection)
    ) {
      throw new RangeError(
        'Argument edgeDirection must be either "unidirectional", "bidirectional" or "mixed"',
      );
    }

    if (typeof args.allowRecursiveEdges !== 'boolean') {
      throw new TypeError(
        'Argument allowRecursiveEdges must be of type boolean',
      );
    }

    if (args.edgeAmountPerNode.min <= 0) {
      throw new RangeError('Argument edgeAmountPerNode.min must be above zero');
    }

    if (args.nodeAmount.min <= 1) {
      throw new RangeError('Argument nodeAmount.min must be at least two');
    }
  }
}
