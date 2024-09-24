import {
  AlgorithmExecutionLogEvent,
  AlgorithmExecutionLogStep,
  AlgorithmExecutionLogStepAddedEvent,
  IAlgorithmExecutionLog,
  IAlgorithmExecutionLogStepId,
  IAlgorithmExecutionLogStepOption,
} from '@algorithm-visualizer/algorithm-execution-log-contract';
import {
  BaseEvent,
  IEventHandlerChain,
} from '@algorithm-visualizer/event-handling-contract';
import { IStack } from '@algorithm-visualizer/stack-contract';

interface IAlgorithmExecutionLogArgs {
  eventHandlerChain: IEventHandlerChain<AlgorithmExecutionLogEvent>;
  sequenceRootStack: IStack<IAlgorithmExecutionLogStepId>;
}

const initialStepId = 0;
const initialOptionId = 0;

export class AlgorithmExecutionLog implements IAlgorithmExecutionLog {
  private _eventHandlerChain: IEventHandlerChain<AlgorithmExecutionLogEvent>;
  private _sequenceRootStack: IStack<IAlgorithmExecutionLogStepId>;
  private _nextAvailableStepId: number;
  private _nextAvailableOptionId: number;
  private _nextAvailableOptionStepId: number;
  private _loggedExecutionSteps: AlgorithmExecutionLogStep[];

  constructor(args: IAlgorithmExecutionLogArgs) {
    this._eventHandlerChain = args.eventHandlerChain;
    this._sequenceRootStack = args.sequenceRootStack;
    this._nextAvailableStepId = initialStepId;
    this._nextAvailableOptionId = initialOptionId;
    this._nextAvailableOptionStepId = initialStepId;
    this._loggedExecutionSteps = [];
    this._initializeEventHandlerChain();
  }

  getFirstStepId() {
    return initialStepId;
  }

  getLastStepId() {
    return this._loggedExecutionSteps.at(-1)?.id ?? initialStepId;
  }

  getStep({ stepId, optionId }: IAlgorithmExecutionLogStepId) {
    const isOptionIdNumber = typeof optionId === 'number';

    if (isOptionIdNumber) {
      const isOptionId = (option: IAlgorithmExecutionLogStepOption) =>
        option.id === optionId;

      const optionRootStep = this._loggedExecutionSteps.find(step =>
        step.options.some(isOptionId),
      );
      const selectedOption = optionRootStep?.options.find(isOptionId);
      const step = selectedOption?.steps.find(step => step.id === stepId);
      return step ?? null;
    }

    return this._loggedExecutionSteps.find(step => step.id === stepId) ?? null;
  }

  async handleEvent(event: BaseEvent<string>) {
    if (this._isAlgorithmExecutionLogEvent(event)) {
      await this._eventHandlerChain.handle(event);
    }
  }

  private _isAlgorithmExecutionLogEvent(
    event: BaseEvent<string>,
  ): event is AlgorithmExecutionLogEvent {
    return event.name.startsWith('algorithm-execution-log');
  }

  private _initializeEventHandlerChain() {
    this._eventHandlerChain
      .add(event => this._handleOptionSequenceEndedEvent(event))
      .add(event => this._handleOptionSequenceStartedEvent(event))
      .add(event => this._handleStepAddedEvent(event))
      .add(event => this._handleSubStepSequenceEndedEvent(event))
      .add(event => this._handleSubStepSequenceStartedEvent(event));
  }

  private async _handleOptionSequenceEndedEvent(
    event: AlgorithmExecutionLogEvent,
  ) {
    if (event.name !== 'algorithm-execution-log-option-sequence-ended') {
      return false;
    }
    this._sequenceRootStack.pop();
    return true;
  }

  private async _handleOptionSequenceStartedEvent(
    event: AlgorithmExecutionLogEvent,
  ) {
    if (event.name !== 'algorithm-execution-log-option-sequence-started') {
      return false;
    }

    const lastStepId = this.getLastStepId();
    const lastStep = this.getStep({ stepId: lastStepId });
    const optionId = this._nextAvailableOptionId++;
    this._nextAvailableOptionStepId = lastStepId + 1;

    this._sequenceRootStack.push({
      stepId: lastStepId,
      optionId,
    });

    lastStep?.options.push({
      id: optionId,
      label: event.optionLabel,
      steps: [],
    });

    return true;
  }

  private async _handleStepAddedEvent(event: AlgorithmExecutionLogEvent) {
    if (event.name !== 'algorithm-execution-log-step-added') {
      return false;
    }

    const isSubStep = this._sequenceRootStack.top()?.optionId === undefined;
    const isOptionStep = !isSubStep;

    if (this._sequenceRootStack.isEmpty()) {
      this._addNormalStep(event);
      return true;
    }

    if (isSubStep) {
      this._addSubStep(event);
      return true;
    }

    if (isOptionStep) {
      this._addOptionStep(event);
      return true;
    }

    return true;
  }

  private async _handleSubStepSequenceEndedEvent(
    event: AlgorithmExecutionLogEvent,
  ) {
    if (event.name !== 'algorithm-execution-log-sub-step-sequence-ended') {
      return false;
    }
    this._sequenceRootStack.pop();
    return true;
  }

  private async _handleSubStepSequenceStartedEvent(
    event: AlgorithmExecutionLogEvent,
  ) {
    if (event.name !== 'algorithm-execution-log-sub-step-sequence-started') {
      return false;
    }
    this._sequenceRootStack.push({ stepId: this.getLastStepId() });
    return true;
  }

  private _addNormalStep(event: AlgorithmExecutionLogStepAddedEvent) {
    const { title, description, viewEvents } = event;
    this._loggedExecutionSteps.push(
      new AlgorithmExecutionLogStep({
        id: this._nextAvailableStepId++,
        title,
        description,
        viewEvents,
      }),
    );
  }

  private _addSubStep(event: AlgorithmExecutionLogStepAddedEvent) {
    const { title, description, viewEvents } = event;
    const rootStep = this._sequenceRootStack.top();

    if (rootStep) {
      const subStepRoot = this._loggedExecutionSteps.find(
        step => step.id === rootStep.stepId,
      );
      subStepRoot?.markAsSubStepRoot();
    }

    this._loggedExecutionSteps.push(
      new AlgorithmExecutionLogStep({
        id: this._nextAvailableStepId++,
        title,
        description,
        viewEvents,
        subStepOf: rootStep?.stepId,
      }),
    );
  }

  private _addOptionStep(event: AlgorithmExecutionLogStepAddedEvent) {
    const { title, description, viewEvents } = event;
    const rootStep = this._sequenceRootStack.top();

    if (rootStep) {
      const rootStepOption = this._loggedExecutionSteps
        .find(step => step.id === rootStep.stepId)
        ?.options.find(option => option.id === rootStep.optionId);

      rootStepOption?.steps.push(
        new AlgorithmExecutionLogStep({
          id: this._nextAvailableOptionStepId++,
          title,
          description,
          viewEvents,
        }),
      );
    }
  }
}
