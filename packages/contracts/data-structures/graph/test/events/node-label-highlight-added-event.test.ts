import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import { NodeLabelHighlightAddedEvent } from '../../src/events';
import { NodeLabelHighlightStyleClass } from '../../src/interfaces';

describe('NodeLabelHighlightAddedEvent', () => {
  const nodeId = 3;
  const highlightStyleClass: NodeLabelHighlightStyleClass =
    'nodeLabelHighlightStyle1';
  let nodeLabelHighlightAddedEvent: NodeLabelHighlightAddedEvent;

  beforeEach(() => {
    jest.resetAllMocks();
    nodeLabelHighlightAddedEvent = new NodeLabelHighlightAddedEvent({
      nodeId,
      highlightStyleClass,
    });
  });

  describe('Getter Methods', () => {
    describe('nodeId()', () => {
      it('returns the specified node id', () => {
        expect(nodeLabelHighlightAddedEvent.nodeId).toBe(nodeId);
      });
    });

    describe('highlightStyleClass()', () => {
      it('returns the specified highlightStyleClass', () => {
        expect(nodeLabelHighlightAddedEvent.highlightStyleClass).toBe(
          highlightStyleClass,
        );
      });
    });
  });

  describe('Setter Methods', () => {
    describe('edgeId()', () => {
      it('throws an invalid operation error when trying to write to the nodeId property', () => {
        expect(() => {
          nodeLabelHighlightAddedEvent.nodeId = 5;
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
          nodeLabelHighlightAddedEvent.highlightStyleClass =
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
