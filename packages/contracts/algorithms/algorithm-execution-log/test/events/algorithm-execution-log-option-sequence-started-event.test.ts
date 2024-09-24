import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { AlgorithmExecutionLogOptionSequenceStartedEvent } from '../../src';

describe('AlgorithmExecutionLogOptionSequenceStartedEvent', () => {
  let sequenceStartedEvent: AlgorithmExecutionLogOptionSequenceStartedEvent;

  beforeEach(() => {
    jest.resetAllMocks();
    sequenceStartedEvent = new AlgorithmExecutionLogOptionSequenceStartedEvent({
      optionLabel: 'foo',
    });
  });

  describe('optionLabel()', () => {
    it('getter returns the specified optionLabel value', () => {
      expect(sequenceStartedEvent.optionLabel).toBe('foo');
    });

    it('setter throws an invalid operation error', () => {
      expect(() => (sequenceStartedEvent.optionLabel = 'bar')).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property optionLabel is forbidden',
        }),
      );
    });
  });
});
