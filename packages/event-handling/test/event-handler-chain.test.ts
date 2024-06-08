import { IBaseEvent } from '../src/base-event';
import { EventHandlerChain } from '../src/event-handler-chain';

interface IMockEventA extends IBaseEvent<'event-a'> {
  propertyA: string;
}

interface IMockEventB extends IBaseEvent<'event-b'> {
  propertyB: string;
}

type MockEvents = IMockEventA | IMockEventB;

const mockEventA: IMockEventA = {
  name: 'event-a',
  creationTime: 123,
  propertyA: 'event A',
};

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
    handlerChain = new EventHandlerChain();
  });

  describe('add()', () => {
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
        handlerChain
          .add(mockEventA1Handler)
          .add(mockEventA2Handler)
          .add(mockEventBHandler);
      });

      it('calls each registered event handler', () => {
        handlerChain.handle(mockEventA);
        expect(mockEventA1Handler).toHaveBeenCalledTimes(1);
        expect(mockEventA2Handler).toHaveBeenCalledTimes(1);
        expect(mockEventBHandler).toHaveBeenCalledTimes(1);
      });

      it('executes handing action of each registered handler responsible for the dispatched event', () => {
        handlerChain.handle(mockEventA);
        expect(mockEventA1Handling).toHaveBeenCalledTimes(1);
        expect(mockEventA2Handling).toHaveBeenCalledTimes(1);
      });

      it('does not execute handling action of handlers not responsible for the dispatched event', () => {
        handlerChain.handle(mockEventA);
        expect(mockEventBHandling).not.toHaveBeenCalled();
      });

      it('returns true if at least one registered handler could successfully handle the event', () => {
        const result = handlerChain.handle(mockEventA);
        expect(result).toBe(true);
      });

      it('returns false if no registered handler could successfully handle the event', () => {
        mockEventA1Handler.mockImplementation(
          createMockEventHandlerImplementation(
            'event-a',
            mockEventA1Handling,
            false,
          ),
        );
        const result = handlerChain.handle(mockEventA);
        expect(result).toBe(false);
      });
    });

    describe('when the chain is configured to abort after the first successful handling', () => {
      beforeEach(() => {
        handlerChain = new EventHandlerChain({ abortAfterSuccess: true });
        handlerChain
          .add(mockEventA1Handler)
          .add(mockEventA2Handler)
          .add(mockEventBHandler);
      });

      it('aborts after first successful handler', () => {
        handlerChain.handle(mockEventA);
        expect(mockEventA1Handling).toHaveBeenCalledTimes(1);
        expect(mockEventA2Handler).not.toHaveBeenCalled();
        expect(mockEventA2Handler).not.toHaveBeenCalled();
      });

      it('returns true if at least one registered handler could successfully handle the event', () => {
        const result = handlerChain.handle(mockEventA);
        expect(result).toBe(true);
      });

      it('returns false if no registered handler could successfully handle the event', () => {
        mockEventA1Handler.mockImplementation(
          createMockEventHandlerImplementation(
            'event-a',
            mockEventA1Handling,
            false,
          ),
        );

        const result = handlerChain.handle(mockEventA);
        expect(result).toBe(false);
      });
    });
  });
});
