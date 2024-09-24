import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

export interface IAlgorithmExecutionLogStepOption {
  id: number;
  label: string;
  steps: AlgorithmExecutionLogStep[];
}

interface IAlgorithmExecutionLogStepArgs {
  id: number;
  title: string;
  description: string;
  viewEvents?: BaseEvent<string>[];
  options?: IAlgorithmExecutionLogStepOption[];
  subStepOf?: number;
  hasSubSteps?: boolean;
}

export class AlgorithmExecutionLogStep {
  private _id: number;
  private _title: string;
  private _description: string;
  private _viewEvents: BaseEvent<string>[];
  private _options: IAlgorithmExecutionLogStepOption[];
  private _subStepOf: number | null;
  private _hasSubSteps: boolean;

  constructor(args: IAlgorithmExecutionLogStepArgs) {
    this._id = args.id;
    this._title = args.title;
    this._description = args.description;
    this._viewEvents = args.viewEvents ?? [];
    this._options = args.options ?? [];
    this._subStepOf = args.subStepOf ?? null;
    this._hasSubSteps = args.hasSubSteps ?? false;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get viewEvents() {
    return this._viewEvents.map(event => event);
  }

  get options() {
    return this._options;
  }

  get subStepOf() {
    return this._subStepOf;
  }

  get hasSubSteps() {
    return this._hasSubSteps;
  }

  set id(input: number) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property id is forbidden',
    });
  }

  set title(input: string) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property title is forbidden',
    });
  }

  set description(input: string) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property description is forbidden',
    });
  }

  set viewEvents(input: BaseEvent<string>[]) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property viewEvents is forbidden',
    });
  }

  set options(input: IAlgorithmExecutionLogStepOption[]) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property options is forbidden',
    });
  }

  set subStepOf(input: number | null) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property subStepOf is forbidden',
    });
  }

  set hasSubSteps(input: boolean) {
    throw new InvalidOperationError({
      message: 'Writing to readonly property hasSubSteps is forbidden',
    });
  }

  addOption(option: IAlgorithmExecutionLogStepOption) {
    this._options.push(option);
  }

  markAsSubStepRoot() {
    this._hasSubSteps = true;
  }

  clone() {
    return new AlgorithmExecutionLogStep({
      id: this.id,
      title: this.title,
      description: this.description,
      viewEvents: this.viewEvents,
      options: this.options,
      subStepOf: this.subStepOf ?? undefined,
      hasSubSteps: this.hasSubSteps,
    });
  }
}
