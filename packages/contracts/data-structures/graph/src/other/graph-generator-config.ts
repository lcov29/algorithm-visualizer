import {
  InvalidArgumentError,
  InvalidOperationError,
} from '@algorithm-visualizer/error-handling-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';

export type DirectionOption = 'unidirectional' | 'bidirectional';

export interface IGraphGeneratorConfigArgs {
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

  set nodeAmount(input: IntegerRange) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property nodeAmount is forbidden',
    });
  }

  set edgeAmountPerNode(input: IntegerRange) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property edgeAmountPerNode is forbidden',
    });
  }

  set edgeWeight(input: IntegerRange | null) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property edgeWeight is forbidden',
    });
  }

  set edgeDirection(input: DirectionOption) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property edgeDirection is forbidden',
    });
  }

  set allowRecursiveEdges(input: boolean) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property allowRecursiveEdges is forbidden',
    });
  }

  private _validate(args: IGraphGeneratorConfigArgs) {
    if (!['unidirectional', 'bidirectional'].includes(args.edgeDirection)) {
      throw new InvalidArgumentError({
        message:
          'Argument edgeDirection is neither "unidirectional" nor "bidirectional"',
        args: [args.edgeDirection],
      });
    }

    if (typeof args.allowRecursiveEdges !== 'boolean') {
      throw new InvalidArgumentError({
        message: 'Argument allowRecursiveEdges is not a boolean',
        args: [args.allowRecursiveEdges],
      });
    }

    if (args.edgeAmountPerNode.min <= 0) {
      throw new InvalidArgumentError({
        message: 'Argument edgeAmountPerNode.min is below one',
        args: [args.edgeAmountPerNode.min],
      });
    }

    if (args.nodeAmount.min <= 1) {
      throw new InvalidArgumentError({
        message: 'Argument nodeAmount.min is below two',
        args: [args.nodeAmount.min],
      });
    }
  }
}
