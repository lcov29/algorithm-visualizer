/**
 * @jest-environment jsdom
 */
import { FunctionValidator } from '@algorithm-visualizer/data-validation';
import { EventHandlerChain } from '@algorithm-visualizer/event-handling';
import {
  EdgeDisplayedEvent,
  EdgeHiddenEvent,
  EdgeHighlightAddedEvent,
  EdgeHighlightRemovedEvent,
  EdgeLabelChangedEvent,
  EdgeLabelDisplayedEvent,
  EdgeLabelHiddenEvent,
  EdgeLabelHighlightAddedEvent,
  EdgeLabelHighlightRemovedEvent,
  EdgeLabelHighlightStyleClass,
  GraphRenderedEvent,
  GraphViewEvent,
  IGraphSVGRenderEngine,
  NodeDisplayedEvent,
  NodeHiddenEvent,
  NodeHighlightAddedEvent,
  NodeHighlightRemovedEvent,
  NodeHighlightStyleClass,
  NodeLabelChangedEvent,
  NodeLabelDisplayedEvent,
  NodeLabelHiddenEvent,
  NodeLabelHighlightAddedEvent,
  NodeLabelHighlightRemovedEvent,
  NodeLabelHighlightStyleClass,
  NodeTitleChangedEvent,
} from '@algorithm-visualizer/graph-contract';

import { GraphMermaidComponentSelector } from '../../src/view/graph-mermaid-component-selector';
import { GraphVisualizer } from '../../src/view/graph-visualizer';
import { MockMermaidSVGGraph } from './mocks/mock-mermaid-svg-graph';

import { render, screen } from '@testing-library/react';
import * as React from 'react';

const eventHandlerChain = new EventHandlerChain<GraphViewEvent>({
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
  const hiddenClassName = 'hidden';

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
    describe('GraphRenderedEvent', () => {
      const graphCreatedEvent = new GraphRenderedEvent({
        nodes: [{ id: 0, label: 'A' }],
        edges: [{ id: 0, startNodeId: 1, endNodeId: 2 }],
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

  describe('Node Events', () => {
    const nodeHighlightStyleClass: NodeHighlightStyleClass =
      'nodeHighlightStyle1';
    const nodeLabelHighlightStyleClass: NodeLabelHighlightStyleClass =
      'nodeLabelHighlightStyle1';
    const nodeId = 1;

    describe('NodeDisplayedEvent', () => {
      it('displays the specified node', async () => {
        const node = graphComponentSelector.getNode(nodeId);
        await visualizer.handleEvent(new NodeHiddenEvent({ nodeId }));
        expect(node?.classList).toContain(hiddenClassName);
        await visualizer.handleEvent(new NodeDisplayedEvent({ nodeId }));
        expect(node?.classList).not.toContain(hiddenClassName);
      });
    });

    describe('NodeHiddenEvent', () => {
      it('hides the specified node', async () => {
        const node = graphComponentSelector.getNode(nodeId);
        expect(node?.classList).not.toContain(hiddenClassName);
        await visualizer.handleEvent(new NodeHiddenEvent({ nodeId }));
        expect(node?.classList).toContain(hiddenClassName);
      });
    });

    describe('NodeHighlightAddedEvent', () => {
      it('highlights the specified node', async () => {
        const node = graphComponentSelector.getNode(nodeId);
        expect(node?.classList).not.toContain(nodeHighlightStyleClass);
        await visualizer.handleEvent(
          new NodeHighlightAddedEvent({
            nodeId,
            highlightStyleClass: nodeHighlightStyleClass,
          }),
        );
        expect(node?.classList).toContain(nodeHighlightStyleClass);
      });
    });

    describe('NodeHighlightRemovedEvent', () => {
      it('removes the highlighting of the specified node', async () => {
        const node = graphComponentSelector.getNode(nodeId);
        await visualizer.handleEvent(
          new NodeHighlightAddedEvent({
            nodeId,
            highlightStyleClass: nodeHighlightStyleClass,
          }),
        );
        expect(node?.classList).toContain(nodeHighlightStyleClass);
        await visualizer.handleEvent(
          new NodeHighlightRemovedEvent({
            nodeId,
            highlightStyleClass: nodeHighlightStyleClass,
          }),
        );
        expect(node?.classList).not.toContain(nodeHighlightStyleClass);
      });
    });

    describe('NodeLabelChangedEvent', () => {
      it('changes the label text of the specified node', async () => {
        const nodeLabel = graphComponentSelector.getLabelOfNode(nodeId);
        expect(nodeLabel?.textContent).not.toBe('Foo');
        await visualizer.handleEvent(
          new NodeLabelChangedEvent({ nodeId, label: 'Foo' }),
        );
        expect(nodeLabel?.textContent).toBe('Foo');
      });
    });

    describe('NodeLabelDisplayedEvent', () => {
      it('displays the specified node label', async () => {
        const nodeLabel = graphComponentSelector.getLabelOfNode(nodeId);
        await visualizer.handleEvent(new NodeLabelHiddenEvent({ nodeId }));
        expect(nodeLabel?.classList).toContain(hiddenClassName);
        await visualizer.handleEvent(new NodeLabelDisplayedEvent({ nodeId }));
        expect(nodeLabel?.classList).not.toContain(hiddenClassName);
      });
    });

    describe('NodeLabelHiddenEvent', () => {
      it('hides the specified node label', async () => {
        const nodeLabel = graphComponentSelector.getLabelOfNode(nodeId);
        expect(nodeLabel?.classList).not.toContain(hiddenClassName);
        await visualizer.handleEvent(new NodeLabelHiddenEvent({ nodeId }));
        expect(nodeLabel?.classList).toContain(hiddenClassName);
      });
    });

    describe('NodeLabelHighlightAddedEvent', () => {
      it('highlights the label of the specified node', async () => {
        await visualizer.handleEvent(
          new NodeLabelHighlightAddedEvent({
            nodeId,
            highlightStyleClass: nodeLabelHighlightStyleClass,
          }),
        );
        const nodeLabel = graphComponentSelector.getLabelOfNode(nodeId);
        expect(nodeLabel?.classList).toContain(nodeLabelHighlightStyleClass);
        await visualizer.handleEvent(
          new NodeLabelHighlightRemovedEvent({
            nodeId,
            highlightStyleClass: nodeLabelHighlightStyleClass,
          }),
        );
        expect(nodeLabel?.classList).not.toContain(
          nodeLabelHighlightStyleClass,
        );
      });
    });

    describe('NodeLabelHighlightRemovedEvent', () => {
      it('removes the highlighting of the label of the specified node', async () => {
        const nodeLabel = graphComponentSelector.getLabelOfNode(nodeId);
        expect(nodeLabel?.classList).not.toContain(
          nodeLabelHighlightStyleClass,
        );
        await visualizer.handleEvent(
          new NodeLabelHighlightAddedEvent({
            nodeId,
            highlightStyleClass: nodeLabelHighlightStyleClass,
          }),
        );
        expect(nodeLabel?.classList).toContain(nodeLabelHighlightStyleClass);
      });
    });

    describe('NodeTitleChangedEvent', () => {
      it('adds a title attribute to the specified node', async () => {
        const nodeLabel = graphComponentSelector.getLabelOfNode(nodeId);
        expect(nodeLabel?.getAttribute('title')).toBeNull();
        await visualizer.handleEvent(
          new NodeTitleChangedEvent({ nodeId, title: 'Foo' }),
        );
        expect(nodeLabel?.getAttribute('title')).toBe('Foo');
      });
    });
  });

  describe('Edge Events', () => {
    const edgeHighlightClassName = 'edgeHighlighted';
    const edgeLabelHighlightClassName: EdgeLabelHighlightStyleClass =
      'edgeLabelHighlightStyle1';
    const edgeId = 2;

    describe('EdgeDisplayedEvent', () => {
      it('displays the specified edge', async () => {
        const edge = graphComponentSelector.getEdge(edgeId);
        await visualizer.handleEvent(new EdgeHiddenEvent({ edgeId }));
        expect(edge?.classList).toContain(hiddenClassName);
        await visualizer.handleEvent(new EdgeDisplayedEvent({ edgeId }));
        expect(edge?.classList).not.toContain(hiddenClassName);
      });
    });

    describe('EdgeHiddenEvent', () => {
      it('hides the specified edge', async () => {
        const edge = graphComponentSelector.getEdge(edgeId);
        expect(edge?.classList).not.toContain(hiddenClassName);
        await visualizer.handleEvent(new EdgeHiddenEvent({ edgeId }));
        expect(edge?.classList).toContain(hiddenClassName);
      });
    });

    describe('EdgeHighlightAddedEvent', () => {
      it('highlights the specified edge', async () => {
        const edge = graphComponentSelector.getEdge(edgeId);
        expect(edge?.classList).not.toContain(edgeHighlightClassName);
        await visualizer.handleEvent(new EdgeHighlightAddedEvent(edgeId));
        expect(edge?.classList).toContain(edgeHighlightClassName);
      });
    });

    describe('EdgeHighlightRemovedEvent', () => {
      it('removes the highlighting of the specified edge', async () => {
        const edge = graphComponentSelector.getEdge(edgeId);
        await visualizer.handleEvent(new EdgeHighlightAddedEvent(edgeId));
        expect(edge?.classList).toContain(edgeHighlightClassName);
        await visualizer.handleEvent(new EdgeHighlightRemovedEvent(edgeId));
        expect(edge?.classList).not.toContain(edgeHighlightClassName);
      });
    });

    describe('EdgeLabelChangedEvent', () => {
      it('changes the label of the specified edge', async () => {
        const edgeLabel = graphComponentSelector.getLabelOfEdge(edgeId);
        expect(edgeLabel?.textContent).toBe('5');
        await visualizer.handleEvent(
          new EdgeLabelChangedEvent({ edgeId, label: 'Foo' }),
        );
        expect(edgeLabel?.textContent).toBe('Foo');
      });
    });

    describe('EdgeLabelDisplayedEvent', () => {
      it('displays the specified edge label', async () => {
        const edgeLabel = graphComponentSelector.getLabelOfEdge(edgeId);
        await visualizer.handleEvent(new EdgeLabelHiddenEvent({ edgeId }));
        expect(edgeLabel?.classList).toContain(hiddenClassName);
        await visualizer.handleEvent(new EdgeLabelDisplayedEvent({ edgeId }));
        expect(edgeLabel?.classList).not.toContain(hiddenClassName);
      });
    });

    describe('EdgeLabelHiddenEvent', () => {
      it('hides the specified edge label', async () => {
        const edgeLabel = graphComponentSelector.getLabelOfEdge(edgeId);
        expect(edgeLabel?.classList).not.toContain(hiddenClassName);
        await visualizer.handleEvent(new EdgeLabelHiddenEvent({ edgeId }));
        expect(edgeLabel?.classList).toContain(hiddenClassName);
      });
    });

    describe('EdgeLabelHighlightAddedEvent', () => {
      it('highlights the label of the specified edge', async () => {
        const edgeLabel = graphComponentSelector.getLabelOfEdge(edgeId);
        expect(edgeLabel?.classList).not.toContain(edgeLabelHighlightClassName);
        await visualizer.handleEvent(
          new EdgeLabelHighlightAddedEvent({
            edgeId,
            highlightStyleClass: edgeLabelHighlightClassName,
          }),
        );
        expect(edgeLabel?.classList).toContain(edgeLabelHighlightClassName);
      });
    });

    describe('EdgeLabelHighlightRemovedEvent', () => {
      it('removes the highlighting of the label of the specified edge', async () => {
        const edgeLabel = graphComponentSelector.getLabelOfEdge(edgeId);
        await visualizer.handleEvent(
          new EdgeLabelHighlightAddedEvent({
            edgeId,
            highlightStyleClass: edgeLabelHighlightClassName,
          }),
        );
        expect(edgeLabel?.classList).toContain(edgeLabelHighlightClassName);
        await visualizer.handleEvent(
          new EdgeLabelHighlightRemovedEvent({
            edgeId,
            highlightStyleClass: edgeLabelHighlightClassName,
          }),
        );
        expect(edgeLabel?.classList).not.toContain(edgeLabelHighlightClassName);
      });
    });

    describe('EdgeLabelChangedEvent', () => {
      it('changes the label text of the specified edge', async () => {
        const edgeLabel = graphComponentSelector.getLabelOfEdge(edgeId);
        expect(edgeLabel?.textContent).not.toBe('6');
        await visualizer.handleEvent(
          new EdgeLabelChangedEvent({ edgeId, label: '6' }),
        );
        expect(edgeLabel?.textContent).toBe('6');
      });
    });
  });
});
