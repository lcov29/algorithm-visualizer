import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { GraphStructureNodeDeletedEvent } from '../../../src';

describe('GraphStructureNodeDeletedEvent', () => {
  const nodeId = 5;
  const nodeDeletedEvent = new GraphStructureNodeDeletedEvent({ nodeId });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('nodeId()', () => {
    it('getter returns specified nodeId value', () => {
      expect(nodeDeletedEvent.nodeId).toEqual(nodeId);
    });

    it('setter throws an invalid operation error when trying to write to the nodeId property', () => {
      expect(() => {
        nodeDeletedEvent.nodeId = nodeId;
      }).toThrow(
        new InvalidOperationError({
          message: 'Writing to readonly property nodeId is forbidden',
        }),
      );
    });
  });
});
