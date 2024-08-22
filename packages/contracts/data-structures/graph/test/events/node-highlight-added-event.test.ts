import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeHighlightAddedEvent } from '../../src/events';

describe('NodeHighlightAddedEvent', () => {
  describe('node()', () => {
    const nodeId = 3;
    const highlightStyleClass = 'nodeHighlightStyle1';
    let nodeHighlightAddedEvent: NodeHighlightAddedEvent;

    beforeEach(() => {
      jest.resetAllMocks();
      nodeHighlightAddedEvent = new NodeHighlightAddedEvent({
        nodeId,
        highlightStyleClass,
      });
    });

    describe('Getter Methods', () => {
      describe('nodeId()', () => {
        it('returns the specified node id', () => {
          expect(nodeHighlightAddedEvent.nodeId).toBe(nodeId);
        });
      });

      describe('highlightStyleClass()', () => {
        it('returns the specified highlightStyleClass', () => {
          expect(nodeHighlightAddedEvent.highlightStyleClass).toBe(
            highlightStyleClass,
          );
        });
      });
    });

    describe('Setter Methods', () => {
      describe('nodeId()', () => {
        it('throws an invalid operation error when trying to write to the node property', () => {
          expect(() => {
            nodeHighlightAddedEvent.nodeId = 5;
          }).toThrow(
            new InvalidOperationError({
              message: 'Writing to readonly property nodeId is forbidden',
            }),
          );
        });
      });

      describe('highlightStyleClass', () => {
        it('throws an invalid operation error when trying to write to the highlightStyleClass property', () => {
          expect(() => {
            nodeHighlightAddedEvent.highlightStyleClass = 'nodeHighlightStyle2';
          }).toThrow(
            new InvalidOperationError({
              message:
                'Writing to readonly property highlightStyleClass is forbidden',
            }),
          );
        });
      });
    });
  });
});
