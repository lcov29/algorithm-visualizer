import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';

export type DirectionOption = 'unidirectional' | 'bidirectional';

interface IGraphGeneratorConfigArgs {
  nodeAmount: IntegerRange;
  edgeAmountPerNode: IntegerRange;
  edgeWeight: IntegerRange | null;
  edgeDirection: DirectionOption;
  allowRecursiveEdges: boolean;
}

export class GraphGeneratorConfig {
  private _nodeAmount: IntegerRange;
  private _edgeAmountPerNode: IntegerRange;
  private _edgeWeight: IntegerRange | null;
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
    if (!['unidirectional', 'bidirectional'].includes(args.edgeDirection)) {
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
