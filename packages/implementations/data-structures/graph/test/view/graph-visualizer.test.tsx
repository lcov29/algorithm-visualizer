/**
 * @jest-environment jsdom
 */
import { FunctionValidator } from '@algorithm-visualizer/data-validation';
import { EventHandlerChain } from '@algorithm-visualizer/event-handling';
import {
  EdgeLabelHighlightStyleClass,
  GraphViewEdgeDisplayedEvent,
  GraphViewEdgeHiddenEvent,
  GraphViewEdgeHighlightAddedEvent,
  GraphViewEdgeHighlightRemovedEvent,
  GraphViewEdgeLabelChangedEvent,
  GraphViewEdgeLabelDisplayedEvent,
  GraphViewEdgeLabelHiddenEvent,
  GraphViewEdgeLabelHighlightAddedEvent,
  GraphViewEdgeLabelHighlightRemovedEvent,
  GraphViewEvent,
  GraphViewInitializedEvent,
  GraphViewNodeDisplayedEvent,
  GraphViewNodeHiddenEvent,
  GraphViewNodeHighlightAddedEvent,
  GraphViewNodeHighlightRemovedEvent,
  GraphViewNodeLabelChangedEvent,
  GraphViewNodeLabelDisplayedEvent,
  GraphViewNodeLabelHiddenEvent,
  GraphViewNodeLabelHighlightAddedEvent,
  GraphViewNodeLabelHighlightRemovedEvent,
  GraphViewNodeTitleChangedEvent,
  IGraphRenderer,
  NodeHighlightStyleClass,
  NodeLabelHighlightStyleClass,
} from '@algorithm-visualizer/graph-contract';

import { GraphVisualizer } from '../../src/view/graph-visualizer';
import { GraphMermaidComponentSelector } from '../../src/view/mermaid-renderer/graph-mermaid-component-selector';
import { MockMermaidSVGGraph } from './mermaid/mocks/mock-mermaid-svg-graph';

import { render, screen } from '@testing-library/react';
import * as React from 'react';

const eventHandlerChain = new EventHandlerChain<GraphViewEvent>({
  abortAfterSuccess: false,
  validator: new FunctionValidator(),
});

const graphComponentSelector = new GraphMermaidComponentSelector();

const mockSetGraph = jest.fn();
const mockRender = jest.fn();

const mockGraphRenderer: IGraphRenderer = {
  render: mockRender,
  setGraphReference: jest.fn(),
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
      graphRenderer: mockGraphRenderer,
    });
    visualizer.setGraphViewReferences(mockGraphRef, mockSetGraph);
  });

  describe('handleEvent()', () => {
    describe('GraphViewInitializedEvent', () => {
      const graphInitializedEvent = new GraphViewInitializedEvent({
        nodes: [{ id: 0, label: 'A' }],
        edges: [{ id: 0, startNodeId: 1, endNodeId: 2 }],
      });

      beforeEach(async () => {
        mockRender.mockResolvedValue(<p>Foo</p>);
        await visualizer.handleEvent(graphInitializedEvent);
      });

      it('passes the event to the graph renderer', () => {
        expect(mockRender).toHaveBeenCalledWith(graphInitializedEvent);
      });

      it('sets the graph to the generated react element', () => {
        expect(mockSetGraph).toHaveBeenCalledWith(<p>Foo</p>);
      });
    });
  });

  describe('Node Events', () => {
    const nodeHighlightStyleClass: NodeHighlightStyleClass =
      'nodeHighlightStyle1';
    const nodeLabelHighlightStyleClass: NodeLabelHighlightStyleClass =
      'nodeLabelHighlightStyle1';
    const nodeId = 1;

    describe('GraphViewNodeDisplayedEvent', () => {
      it('displays the specified node', async () => {
        const node = graphComponentSelector.getNode(nodeId);
        await visualizer.handleEvent(new GraphViewNodeHiddenEvent({ nodeId }));
        expect(node?.classList).toContain(hiddenClassName);
        await visualizer.handleEvent(
          new GraphViewNodeDisplayedEvent({ nodeId }),
        );
        expect(node?.classList).not.toContain(hiddenClassName);
      });
    });

    describe('GraphViewNodeHiddenEvent', () => {
      it('hides the specified node', async () => {
        const node = graphComponentSelector.getNode(nodeId);
        expect(node?.classList).not.toContain(hiddenClassName);
        await visualizer.handleEvent(new GraphViewNodeHiddenEvent({ nodeId }));
        expect(node?.classList).toContain(hiddenClassName);
      });
    });

    describe('GraphViewNodeHighlightAddedEvent', () => {
      it('highlights the specified node', async () => {
        const node = graphComponentSelector.getNode(nodeId);
        expect(node?.classList).not.toContain(nodeHighlightStyleClass);
        await visualizer.handleEvent(
          new GraphViewNodeHighlightAddedEvent({
            nodeId,
            highlightStyleClass: nodeHighlightStyleClass,
          }),
        );
        expect(node?.classList).toContain(nodeHighlightStyleClass);
      });
    });

    describe('GraphViewNodeHighlightRemovedEvent', () => {
      it('removes the highlighting of the specified node', async () => {
        const node = graphComponentSelector.getNode(nodeId);
        await visualizer.handleEvent(
          new GraphViewNodeHighlightAddedEvent({
            nodeId,
            highlightStyleClass: nodeHighlightStyleClass,
          }),
        );
        expect(node?.classList).toContain(nodeHighlightStyleClass);
        await visualizer.handleEvent(
          new GraphViewNodeHighlightRemovedEvent({
            nodeId,
            highlightStyleClass: nodeHighlightStyleClass,
          }),
        );
        expect(node?.classList).not.toContain(nodeHighlightStyleClass);
      });
    });

    describe('GraphViewNodeLabelChangedEvent', () => {
      it('changes the label text of the specified node', async () => {
        const nodeLabel = graphComponentSelector.getNodeLabel(nodeId);
        expect(nodeLabel?.textContent).not.toBe('Foo');
        await visualizer.handleEvent(
          new GraphViewNodeLabelChangedEvent({ nodeId, label: 'Foo' }),
        );
        expect(nodeLabel?.textContent).toBe('Foo');
      });
    });

    describe('GraphViewNodeLabelDisplayedEvent', () => {
      it('displays the specified node label', async () => {
        const nodeLabel = graphComponentSelector.getNodeLabel(nodeId);
        await visualizer.handleEvent(
          new GraphViewNodeLabelHiddenEvent({ nodeId }),
        );
        expect(nodeLabel?.classList).toContain(hiddenClassName);
        await visualizer.handleEvent(
          new GraphViewNodeLabelDisplayedEvent({ nodeId }),
        );
        expect(nodeLabel?.classList).not.toContain(hiddenClassName);
      });
    });

    describe('GraphViewNodeLabelHiddenEvent', () => {
      it('hides the specified node label', async () => {
        const nodeLabel = graphComponentSelector.getNodeLabel(nodeId);
        expect(nodeLabel?.classList).not.toContain(hiddenClassName);
        await visualizer.handleEvent(
          new GraphViewNodeLabelHiddenEvent({ nodeId }),
        );
        expect(nodeLabel?.classList).toContain(hiddenClassName);
      });
    });

    describe('GraphViewNodeLabelHighlightAddedEvent', () => {
      it('highlights the label of the specified node', async () => {
        await visualizer.handleEvent(
          new GraphViewNodeLabelHighlightAddedEvent({
            nodeId,
            highlightStyleClass: nodeLabelHighlightStyleClass,
          }),
        );
        const nodeLabel = graphComponentSelector.getNodeLabel(nodeId);
        expect(nodeLabel?.classList).toContain(nodeLabelHighlightStyleClass);
        await visualizer.handleEvent(
          new GraphViewNodeLabelHighlightRemovedEvent({
            nodeId,
            highlightStyleClass: nodeLabelHighlightStyleClass,
          }),
        );
        expect(nodeLabel?.classList).not.toContain(
          nodeLabelHighlightStyleClass,
        );
      });
    });

    describe('GraphViewNodeLabelHighlightRemovedEvent', () => {
      it('removes the highlighting of the label of the specified node', async () => {
        const nodeLabel = graphComponentSelector.getNodeLabel(nodeId);
        expect(nodeLabel?.classList).not.toContain(
          nodeLabelHighlightStyleClass,
        );
        await visualizer.handleEvent(
          new GraphViewNodeLabelHighlightAddedEvent({
            nodeId,
            highlightStyleClass: nodeLabelHighlightStyleClass,
          }),
        );
        expect(nodeLabel?.classList).toContain(nodeLabelHighlightStyleClass);
      });
    });

    describe('GraphViewNodeTitleChangedEvent', () => {
      it('adds a title attribute to the specified node', async () => {
        const nodeLabel = graphComponentSelector.getNodeLabel(nodeId);
        expect(nodeLabel?.getAttribute('title')).toBeNull();
        await visualizer.handleEvent(
          new GraphViewNodeTitleChangedEvent({ nodeId, title: 'Foo' }),
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

    describe('GraphViewEdgeDisplayedEvent', () => {
      it('displays the specified edge', async () => {
        const edge = graphComponentSelector.getEdge(edgeId);
        await visualizer.handleEvent(new GraphViewEdgeHiddenEvent({ edgeId }));
        expect(edge?.classList).toContain(hiddenClassName);
        await visualizer.handleEvent(
          new GraphViewEdgeDisplayedEvent({ edgeId }),
        );
        expect(edge?.classList).not.toContain(hiddenClassName);
      });
    });

    describe('GraphViewEdgeHiddenEvent', () => {
      it('hides the specified edge', async () => {
        const edge = graphComponentSelector.getEdge(edgeId);
        expect(edge?.classList).not.toContain(hiddenClassName);
        await visualizer.handleEvent(new GraphViewEdgeHiddenEvent({ edgeId }));
        expect(edge?.classList).toContain(hiddenClassName);
      });
    });

    describe('GraphViewEdgeHighlightAddedEvent', () => {
      it('highlights the specified edge', async () => {
        const edge = graphComponentSelector.getEdge(edgeId);
        expect(edge?.classList).not.toContain(edgeHighlightClassName);
        await visualizer.handleEvent(
          new GraphViewEdgeHighlightAddedEvent({ edgeId }),
        );
        expect(edge?.classList).toContain(edgeHighlightClassName);
      });
    });

    describe('GraphViewEdgeHighlightRemovedEvent', () => {
      it('removes the highlighting of the specified edge', async () => {
        const edge = graphComponentSelector.getEdge(edgeId);
        await visualizer.handleEvent(
          new GraphViewEdgeHighlightAddedEvent({ edgeId }),
        );
        expect(edge?.classList).toContain(edgeHighlightClassName);
        await visualizer.handleEvent(
          new GraphViewEdgeHighlightRemovedEvent({ edgeId }),
        );
        expect(edge?.classList).not.toContain(edgeHighlightClassName);
      });
    });

    describe('GraphViewEdgeLabelChangedEvent', () => {
      it('changes the label of the specified edge', async () => {
        const edgeLabel = graphComponentSelector.getEdgeLabel(edgeId);
        expect(edgeLabel?.textContent).toBe('5');
        await visualizer.handleEvent(
          new GraphViewEdgeLabelChangedEvent({ edgeId, label: 'Foo' }),
        );
        expect(edgeLabel?.textContent).toBe('Foo');
      });
    });

    describe('GraphViewEdgeLabelDisplayedEvent', () => {
      it('displays the specified edge label', async () => {
        const edgeLabel = graphComponentSelector.getEdgeLabel(edgeId);
        await visualizer.handleEvent(
          new GraphViewEdgeLabelHiddenEvent({ edgeId }),
        );
        expect(edgeLabel?.classList).toContain(hiddenClassName);
        await visualizer.handleEvent(
          new GraphViewEdgeLabelDisplayedEvent({ edgeId }),
        );
        expect(edgeLabel?.classList).not.toContain(hiddenClassName);
      });
    });

    describe('GraphViewEdgeLabelHiddenEvent', () => {
      it('hides the specified edge label', async () => {
        const edgeLabel = graphComponentSelector.getEdgeLabel(edgeId);
        expect(edgeLabel?.classList).not.toContain(hiddenClassName);
        await visualizer.handleEvent(
          new GraphViewEdgeLabelHiddenEvent({ edgeId }),
        );
        expect(edgeLabel?.classList).toContain(hiddenClassName);
      });
    });

    describe('GraphViewEdgeLabelHighlightAddedEvent', () => {
      it('highlights the label of the specified edge', async () => {
        const edgeLabel = graphComponentSelector.getEdgeLabel(edgeId);
        expect(edgeLabel?.classList).not.toContain(edgeLabelHighlightClassName);
        await visualizer.handleEvent(
          new GraphViewEdgeLabelHighlightAddedEvent({
            edgeId,
            highlightStyleClass: edgeLabelHighlightClassName,
          }),
        );
        expect(edgeLabel?.classList).toContain(edgeLabelHighlightClassName);
      });
    });

    describe('GraphViewEdgeLabelHighlightRemovedEvent', () => {
      it('removes the highlighting of the label of the specified edge', async () => {
        const edgeLabel = graphComponentSelector.getEdgeLabel(edgeId);
        await visualizer.handleEvent(
          new GraphViewEdgeLabelHighlightAddedEvent({
            edgeId,
            highlightStyleClass: edgeLabelHighlightClassName,
          }),
        );
        expect(edgeLabel?.classList).toContain(edgeLabelHighlightClassName);
        await visualizer.handleEvent(
          new GraphViewEdgeLabelHighlightRemovedEvent({
            edgeId,
            highlightStyleClass: edgeLabelHighlightClassName,
          }),
        );
        expect(edgeLabel?.classList).not.toContain(edgeLabelHighlightClassName);
      });
    });

    describe('GraphViewEdgeLabelChangedEvent', () => {
      it('changes the label text of the specified edge', async () => {
        const edgeLabel = graphComponentSelector.getEdgeLabel(edgeId);
        expect(edgeLabel?.textContent).not.toBe('6');
        await visualizer.handleEvent(
          new GraphViewEdgeLabelChangedEvent({ edgeId, label: '6' }),
        );
        expect(edgeLabel?.textContent).toBe('6');
      });
    });
  });
});
