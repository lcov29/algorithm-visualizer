import { IFunctionValidator } from '@algorithm-visualizer/data-validation-contract';
import { InvalidArgumentError } from '@algorithm-visualizer/error-handling-contract';
import { BaseEvent } from '@algorithm-visualizer/event-handling-contract';

import { EventHandlerChain } from '../src/event-handler-chain';

function getMockValidatorReturning(result: boolean) {
  return { isFunction: () => result } as IFunctionValidator;
}

class MockEventA extends BaseEvent<'event-a'> {
  constructor() {
    super('event-a');
  }
}

class MockEventB extends BaseEvent<'event-b'> {
  constructor() {
    super('event-b');
  }
}

type MockEvents = MockEventA | MockEventB;

describe('EventHandlerChain', () => {
  let handlerChain: EventHandlerChain<MockEvents>;
  const mockEventA1Handler = jest.fn();
  const mockEventA2Handler = jest.fn();
  const mockEventBHandler = jest.fn();

  const mockEventA1Handling = jest.fn();
  const mockEventA2Handling = jest.fn();
  const mockEventBHandling = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    handlerChain = new EventHandlerChain({
      abortAfterSuccess: true,
      validator: getMockValidatorReturning(true),
    });
  });

  describe('add()', () => {
    it('throws an invalid argument error if the isFunction check fails', () => {
      handlerChain = new EventHandlerChain({
        abortAfterSuccess: true,
        validator: getMockValidatorReturning(false),
      });
      expect(() => handlerChain.add(mockEventBHandler)).toThrow(
        new InvalidArgumentError({
          message: 'Argument handler is not a function',
          args: [mockEventBHandler],
        }),
      );
    });

    it('adds the specified handler to the handler list', () => {
      handlerChain.add(mockEventBHandler);
      // @ts-expect-error private property is accessible at runtime
      expect(handlerChain._handlers).toContain(mockEventBHandler);
    });

    it('returns a reference to its instance to allow method chaining', () => {
      const result = handlerChain.add(mockEventBHandler);
      expect(result).toBe(handlerChain);
    });
  });

  describe('handle()', () => {
    function createMockEventHandlerImplementation(
      eventName: string,
      mockHandling: jest.Mock,
      isSuccessful: boolean,
    ) {
      return (event: MockEvents) => {
        if (event.name === eventName) {
          mockHandling();
          return isSuccessful;
        }
        return false;
      };
    }

    beforeEach(() => {
      mockEventA1Handler.mockImplementation(
        createMockEventHandlerImplementation(
          'event-a',
          mockEventA1Handling,
          true,
        ),
      );

      mockEventA2Handler.mockImplementation(
        createMockEventHandlerImplementation(
          'event-a',
          mockEventA2Handling,
          false,
        ),
      );

      mockEventBHandler.mockImplementation(
        createMockEventHandlerImplementation(
          'event-b',
          mockEventBHandling,
          false,
        ),
      );
    });

    describe('when the chain is configured to not abort after the first successful handling', () => {
      beforeEach(() => {
        handlerChain = new EventHandlerChain({
          abortAfterSuccess: false,
          validator: getMockValidatorReturning(true),
        });
        handlerChain
          .add(mockEventA1Handler)
          .add(mockEventA2Handler)
          .add(mockEventBHandler);
      });

      it('calls each registered event handler', async () => {
        await handlerChain.handle(new MockEventA());
        expect(mockEventA1Handler).toHaveBeenCalledTimes(1);
        expect(mockEventA2Handler).toHaveBeenCalledTimes(1);
        expect(mockEventBHandler).toHaveBeenCalledTimes(1);
      });

      it('executes handing action of each registered handler responsible for the dispatched event', async () => {
        await handlerChain.handle(new MockEventA());
        expect(mockEventA1Handling).toHaveBeenCalledTimes(1);
        expect(mockEventA2Handling).toHaveBeenCalledTimes(1);
      });

      it('does not execute handling action of handlers not responsible for the dispatched event', async () => {
        await handlerChain.handle(new MockEventA());
        expect(mockEventBHandling).not.toHaveBeenCalled();
      });

      it('returns true if at least one registered handler could successfully handle the event', async () => {
        const result = await handlerChain.handle(new MockEventA());
        expect(result).toBe(true);
      });

      it('returns false if no registered handler could successfully handle the event', async () => {
        mockEventA1Handler.mockImplementation(
          createMockEventHandlerImplementation(
            'event-a',
            mockEventA1Handling,
            false,
          ),
        );
        const result = await handlerChain.handle(new MockEventA());
        expect(result).toBe(false);
      });
    });

    describe('when the chain is configured to abort after the first successful handling', () => {
      beforeEach(() => {
        handlerChain
          .add(mockEventA1Handler)
          .add(mockEventA2Handler)
          .add(mockEventBHandler);
      });

      it('aborts after first successful handler', async () => {
        await handlerChain.handle(new MockEventA());
        expect(mockEventA1Handling).toHaveBeenCalledTimes(1);
        expect(mockEventA2Handler).not.toHaveBeenCalled();
        expect(mockEventA2Handler).not.toHaveBeenCalled();
      });

      it('returns true if at least one registered handler could successfully handle the event', async () => {
        const result = await handlerChain.handle(new MockEventA());
        expect(result).toBe(true);
      });

      it('returns false if no registered handler could successfully handle the event', async () => {
        mockEventA1Handler.mockImplementation(
          createMockEventHandlerImplementation(
            'event-a',
            mockEventA1Handling,
            false,
          ),
        );

        const result = await handlerChain.handle(new MockEventA());
        expect(result).toBe(false);
      });
    });
  });
});
