import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeHighlightRemovedEvent } from '../../src/events';
import { NodeHighlightStyleClass } from '../../src/interfaces';

describe('NodeHighlightRemovedEvent', () => {
  describe('node()', () => {
    const nodeId = 3;
    const highlightStyleClass: NodeHighlightStyleClass = 'nodeHighlightStyle1';
    let nodeHighlightRemovedEvent: NodeHighlightRemovedEvent;

    beforeEach(() => {
      jest.resetAllMocks();
      nodeHighlightRemovedEvent = new NodeHighlightRemovedEvent({
        nodeId,
        highlightStyleClass,
      });
    });

    describe('Getter methods', () => {
      describe('nodeId()', () => {
        it('returns the specified node id', () => {
          expect(nodeHighlightRemovedEvent.nodeId).toBe(nodeId);
        });
      });

      describe('highlightStyleClass()', () => {
        it('returns the specified highlightStyleClass', () => {
          expect(nodeHighlightRemovedEvent.highlightStyleClass).toBe(
            highlightStyleClass,
          );
        });
      });
    });

    describe('Setter methods', () => {
      describe('nodeId()', () => {
        it('throws an invalid operation error when trying to write to the node property', () => {
          expect(() => {
            nodeHighlightRemovedEvent.nodeId = 5;
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
            nodeHighlightRemovedEvent.highlightStyleClass =
              'nodeHighlightStyle2';
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
