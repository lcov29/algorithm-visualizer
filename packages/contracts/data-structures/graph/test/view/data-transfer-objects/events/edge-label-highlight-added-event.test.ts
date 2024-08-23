import { InvalidOperationError } from '@algorithm-visualizer/error-handling-contract';

import {
  EdgeLabelHighlightAddedEvent,
  EdgeLabelHighlightStyleClass,
} from '../../../../src';

describe('EdgeLabelHighlightAddedEvent', () => {
  const edgeId = 3;
  const highlightStyleClass: EdgeLabelHighlightStyleClass =
    'edgeLabelHighlightStyle1';
  let edgeLabelHighlightAddedEvent: EdgeLabelHighlightAddedEvent;

  beforeEach(() => {
    jest.resetAllMocks();
    edgeLabelHighlightAddedEvent = new EdgeLabelHighlightAddedEvent({
      edgeId,
      highlightStyleClass,
    });
  });

  describe('Getter Methods', () => {
    describe('edgeId()', () => {
      it('returns the specified edge id', () => {
        expect(edgeLabelHighlightAddedEvent.edgeId).toBe(edgeId);
      });
    });

    describe('highlightStyleClass()', () => {
      it('returns the specified highlightStyleClass', () => {
        expect(edgeLabelHighlightAddedEvent.highlightStyleClass).toBe(
          highlightStyleClass,
        );
      });
    });
  });

  describe('Setter Methods', () => {
    describe('edgeId()', () => {
      it('throws an invalid operation error when trying to write to the edgeId property', () => {
        expect(() => {
          edgeLabelHighlightAddedEvent.edgeId = 5;
        }).toThrow(
          new InvalidOperationError({
            message: 'Writing to readonly property edgeId is forbidden',
          }),
        );
      });
    });

    describe('highlightStyleClass', () => {
      it('throws an invalid operation error when trying to write to the highlightStyleClass property', () => {
        expect(() => {
          edgeLabelHighlightAddedEvent.highlightStyleClass =
            'edgeLabelHighlightStyle2';
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
