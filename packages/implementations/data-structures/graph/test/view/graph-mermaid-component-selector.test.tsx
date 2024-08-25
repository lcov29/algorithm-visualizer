/**
 * @jest-environment jsdom
 */
import { GraphMermaidComponentSelector } from '../../src/view/graph-mermaid-component-selector';
import { MockMermaidSVGGraph } from './mocks/mock-mermaid-svg-graph';

import { render, screen } from '@testing-library/react';
import * as React from 'react';

const selector = new GraphMermaidComponentSelector();

function getNodeLabelText(nodeLabelElement: Element | null | undefined) {
  return nodeLabelElement?.childNodes[0].textContent ?? '';
}

describe('GraphMermaidComponentSelector', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    render(<MockMermaidSVGGraph />);
    const mockGraphRef = {
      current: screen.getByTestId('mock-mermaid-svg-graph') as HTMLDivElement,
    };
    selector.setGraphReference(mockGraphRef);
  });

  describe('getNode()', () => {
    it.each([
      ['first', 0, 'A'],
      ['second', 1, 'B'],
      ['third', 2, 'C'],
    ])('selects the %s graph node', (_, nodeId, expectedNodeLabelText) => {
      const node = selector.getNode(nodeId);
      const nodeLabelElements = node?.getElementsByClassName('nodeLabel');
      expect(nodeLabelElements).toHaveLength(1);
      expect(getNodeLabelText(nodeLabelElements?.[0])).toBe(
        expectedNodeLabelText,
      );
    });
  });

  describe('getLabelOfNode()', () => {
    it.each([
      ['first', 0, 'A'],
      ['second', 1, 'B'],
      ['third', 2, 'C'],
    ])('selects the %s node label', (_, nodeId, expectedNodeLabelText) => {
      const nodeLabelElement = selector.getNodeLabel(nodeId);
      expect(getNodeLabelText(nodeLabelElement)).toBe(expectedNodeLabelText);
    });
  });

  describe('getEdge()', () => {
    it.each([
      ['first', 0, 0, 1],
      ['second', 1, 1, 2],
      ['third', 2, 0, 2],
    ])('selects the %s edge', (_, edgeId, startNodeId, endNodeId) => {
      const edge = selector.getEdge(edgeId);
      expect(edge?.id).toContain(`L-${startNodeId}-${endNodeId}`);
    });
  });

  describe('getLabelOfEdge()', () => {
    it.each([
      ['first', 0, 0, 1, '10'],
      ['second', 1, 1, 2, '7'],
      ['third', 2, 0, 2, '5'],
    ])(
      'selects the label of the %s edge between the nodes %s and %s',
      (_, edgeId, __, ___, expectedEdgeLabelText) => {
        const edge = selector.getEdgeLabel(edgeId);
        const edgeLabelText = edge?.childNodes[0].textContent ?? '';
        expect(edgeLabelText).toBe(expectedEdgeLabelText);
      },
    );
  });
});
