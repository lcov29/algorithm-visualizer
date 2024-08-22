import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeLabelHighlightRemovedEvent } from '../../src/events';
import { NodeLabelHighlightStyleClass } from '../../src/interfaces';

describe('NodeLabelHighlightRemovedEvent', () => {
  const nodeId = 3;
  const highlightStyleClass: NodeLabelHighlightStyleClass =
    'nodeLabelHighlightStyle1';
  let nodeLabelHighlightRemovedEvent: NodeLabelHighlightRemovedEvent;

  beforeEach(() => {
    jest.resetAllMocks();
    nodeLabelHighlightRemovedEvent = new NodeLabelHighlightRemovedEvent({
      nodeId,
      highlightStyleClass,
    });
  });

  describe('Getter Methods', () => {
    describe('nodeId()', () => {
      it('returns the specified node id', () => {
        expect(nodeLabelHighlightRemovedEvent.nodeId).toBe(nodeId);
      });
    });

    describe('highlightStyleClass()', () => {
      it('returns the specified highlightStyleClass', () => {
        expect(nodeLabelHighlightRemovedEvent.highlightStyleClass).toBe(
          highlightStyleClass,
        );
      });
    });
  });

  describe('Setter Methods', () => {
    describe('edgeId()', () => {
      it('throws an invalid operation error when trying to write to the nodeId property', () => {
        expect(() => {
          nodeLabelHighlightRemovedEvent.nodeId = 5;
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
          nodeLabelHighlightRemovedEvent.highlightStyleClass =
            'nodeLabelHighlightStyle2';
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
