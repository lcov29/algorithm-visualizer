/**
 * @jest-environment jsdom
 */
import { FunctionValidator } from '@algorithm-visualizer/data-validation';
import { EventHandlerChain } from '@algorithm-visualizer/event-handling';
import {
  GraphCreatedEvent,
  GraphVisualizationEvent,
  IGraphSVGRenderEngine,
  NodeHighlightedEvent,
} from '@algorithm-visualizer/graph-contract';

import { EdgeList } from '../../src/structure/edge-list';
import { NodeList } from '../../src/structure/node-list';
import { GraphMermaidComponentSelector } from '../../src/view/graph-mermaid-component-selector';
import { GraphVisualizer } from '../../src/view/graph-visualizer';
import { MockMermaidSVGGraph } from './mocks/mock-mermaid-svg-graph';

import { render, screen } from '@testing-library/react';
import * as React from 'react';

const eventHandlerChain = new EventHandlerChain<GraphVisualizationEvent>({
  abortAfterSuccess: false,
  validator: new FunctionValidator(),
});

const graphComponentSelector = new GraphMermaidComponentSelector();

const mockSetGraphSVGString = jest.fn();
const mockRender = jest.fn();

const mockGraphSVGRenderEngine: IGraphSVGRenderEngine<string> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: mockRender,
};

describe('GraphVisualizer', () => {
  let visualizer: GraphVisualizer;

  beforeEach(() => {
    jest.resetAllMocks();

    render(<MockMermaidSVGGraph />);
    const mockGraphRef = {
      current: screen.getByTestId('mock-mermaid-svg-graph') as HTMLDivElement,
    };

    visualizer = new GraphVisualizer({
      eventHandlerChain,
      graphComponentSelector,
      graphSVGRenderEngine: mockGraphSVGRenderEngine,
    });
    visualizer.setGraphViewReferences(mockGraphRef, mockSetGraphSVGString);
  });

  describe('handleEvent()', () => {
    describe('GraphCreatedEvent', () => {
      const graphCreatedEvent = new GraphCreatedEvent({
        nodes: new NodeList(),
        edges: new EdgeList(),
      });

      beforeEach(async () => {
        mockRender.mockResolvedValue('Foo');
        await visualizer.handleEvent(graphCreatedEvent);
      });

      it('passes the event to the svg render engine', () => {
        expect(mockRender).toHaveBeenCalledWith(graphCreatedEvent);
      });

      it('displays the result of the svg render engine', () => {
        expect(mockSetGraphSVGString).toHaveBeenCalledWith('Foo');
      });
    });
  });

  describe('NodeHighlightedEvent', () => {
    it('highlights the specified node', async () => {
      const nodeId = 1;
      const nodeHighlightedEvent = new NodeHighlightedEvent(nodeId);
      const node = graphComponentSelector.getNode(nodeId);
      expect(node?.classList).not.toContain('nodeHighlighted');
      await visualizer.handleEvent(nodeHighlightedEvent);
      expect(node?.classList).toContain('nodeHighlighted');
    });
  });
});
