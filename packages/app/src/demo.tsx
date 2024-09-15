import { EventSubscriberManager } from '@algorithm-visualizer/event-handling';
import {
  IEventEmitter,
  IEventSubscriber,
} from '@algorithm-visualizer/event-handling-contract';
import {
  GraphView,
  buildGraphGenerator,
  buildGraphVisualizer,
} from '@algorithm-visualizer/graph';
import {
  GraphGeneratorConfig,
  GraphGeneratorGraphGeneratedEvent,
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
  INode,
} from '@algorithm-visualizer/graph-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';

import React, { JSX } from 'react';

class GraphVisualizationController
  implements
    IEventSubscriber<GraphViewEvent | GraphGeneratorGraphGeneratedEvent>,
    IEventEmitter<GraphViewEvent>
{
  private _subscriberManager: EventSubscriberManager<GraphViewEvent>;

  constructor() {
    this._subscriberManager = new EventSubscriberManager<GraphViewEvent>();
  }

  addSubscriber(subscriber: IEventSubscriber<GraphViewEvent>) {
    const subscriberId = this._subscriberManager.addSubscriber(subscriber);
    return subscriberId;
  }

  removeSubscriber(subscriberId: number) {
    this._subscriberManager.removeSubscriber(subscriberId);
  }

  async handleEvent(event: GraphViewEvent | GraphGeneratorGraphGeneratedEvent) {
    if (event.name === 'graph-generator-graph-generated') {
      const utfCodeCharacterA = 65;
      const nodes = event.nodes.nodeIds.map<INode>((nodeId, index) => ({
        id: nodeId,
        label: String.fromCharCode(utfCodeCharacterA + index),
      }));
      const edges = event.edges.edges;

      this._subscriberManager.notifySubscribers(
        new GraphViewInitializedEvent({
          nodes,
          edges,
        }),
      );
    } else {
      this._subscriberManager.notifySubscribers(event);
    }
  }
}

export function Demo(): JSX.Element {
  const graphVisualizer = buildGraphVisualizer();
  const graphGenerator = buildGraphGenerator();
  const graphVisualizationController = new GraphVisualizationController();

  graphVisualizationController.addSubscriber(graphVisualizer);
  graphGenerator.addSubscriber(graphVisualizationController);

  return (
    <>
      <GraphView graphVisualizer={graphVisualizer} />
      <section className="button-section">
        <button
          type="button"
          onClick={() => {
            graphGenerator.generateGraph(
              new GraphGeneratorConfig({
                nodeAmount: new IntegerRange({ min: 3, max: 6 }),
                edgeAmountPerNode: new IntegerRange({ min: 2, max: 3 }),
                edgeWeight: new IntegerRange({ min: 3, max: 10 }),
                edgeDirection: 'bidirectional',
                allowRecursiveEdges: false,
              }),
            );
          }}>
          Generate Random Graph
        </button>
        <button
          type="button"
          onClick={() =>
            graphVisualizationController.handleEvent(
              new GraphViewNodeHighlightAddedEvent({
                nodeId: 1,
                highlightStyleClass: 'nodeHighlightStyle1',
              }),
            )
          }>
          Highlight Node
        </button>
        <button
          type="button"
          onClick={() =>
            graphVisualizationController.handleEvent(
              new GraphViewNodeHighlightRemovedEvent({
                nodeId: 1,
                highlightStyleClass: 'nodeHighlightStyle1',
              }),
            )
          }>
          Remove Node Highlight
        </button>
        <button
          type="button"
          onClick={() =>
            graphVisualizationController.handleEvent(
              new GraphViewNodeLabelChangedEvent({ nodeId: 2, label: '1' }),
            )
          }>
          Change Node Label
        </button>
        <button
          type="button"
          onClick={() =>
            graphVisualizationController.handleEvent(
              new GraphViewEdgeHighlightAddedEvent({ edgeId: 2 }),
            )
          }>
          Highlight Edge
        </button>
        <button
          type="button"
          onClick={() =>
            graphVisualizationController.handleEvent(
              new GraphViewEdgeHighlightRemovedEvent({ edgeId: 2 }),
            )
          }>
          Remove Edge Highlight
        </button>
        <button
          type="button"
          onClick={() =>
            graphVisualizationController.handleEvent(
              new GraphViewEdgeLabelChangedEvent({ edgeId: 1, label: '9' }),
            )
          }>
          Change Edge Label
        </button>
        <button
          type="button"
          onClick={() =>
            graphVisualizationController.handleEvent(
              new GraphViewEdgeLabelHighlightAddedEvent({
                edgeId: 1,
                highlightStyleClass: 'edgeLabelHighlightStyle1',
              }),
            )
          }>
          Highlight Edge Label
        </button>
        <button
          type="button"
          onClick={() =>
            graphVisualizationController.handleEvent(
              new GraphViewEdgeLabelHighlightRemovedEvent({
                edgeId: 1,
                highlightStyleClass: 'edgeLabelHighlightStyle1',
              }),
            )
          }>
          Remove Edge Label Highlight
        </button>
        <button
          type="button"
          onClick={() =>
            graphVisualizationController.handleEvent(
              new GraphViewNodeLabelHighlightAddedEvent({
                nodeId: 1,
                highlightStyleClass: 'nodeLabelHighlightStyle1',
              }),
            )
          }>
          Highlight Node Label
        </button>
        <button
          type="button"
          onClick={() =>
            graphVisualizationController.handleEvent(
              new GraphViewNodeLabelHighlightRemovedEvent({
                nodeId: 1,
                highlightStyleClass: 'nodeLabelHighlightStyle1',
              }),
            )
          }>
          Remove Node Label Highlight
        </button>
        <button
          type="button"
          onClick={() =>
            graphVisualizationController.handleEvent(
              new GraphViewNodeTitleChangedEvent({ nodeId: 1, title: 'Foo!' }),
            )
          }>
          Change Title 1
        </button>
        <button
          type="button"
          onClick={() =>
            graphVisualizationController.handleEvent(
              new GraphViewEdgeHiddenEvent({ edgeId: 1 }),
            )
          }>
          Hide Edge
        </button>
        <button
          type="button"
          onClick={() =>
            graphVisualizationController.handleEvent(
              new GraphViewEdgeDisplayedEvent({ edgeId: 1 }),
            )
          }>
          Display Edge
        </button>
        <button
          type="button"
          onClick={() => {
            graphVisualizationController.handleEvent(
              new GraphViewEdgeLabelHiddenEvent({ edgeId: 1 }),
            );
          }}>
          Hide Edge Label
        </button>
        <button
          type="button"
          onClick={() => {
            graphVisualizationController.handleEvent(
              new GraphViewEdgeLabelDisplayedEvent({ edgeId: 1 }),
            );
          }}>
          Display Edge Label
        </button>
        <button
          type="button"
          onClick={() => {
            graphVisualizationController.handleEvent(
              new GraphViewNodeHiddenEvent({ nodeId: 1 }),
            );
          }}>
          Hide Node
        </button>
        <button
          type="button"
          onClick={() => {
            graphVisualizationController.handleEvent(
              new GraphViewNodeDisplayedEvent({ nodeId: 1 }),
            );
          }}>
          Display Node
        </button>
        <button
          type="button"
          onClick={() => {
            graphVisualizationController.handleEvent(
              new GraphViewNodeLabelHiddenEvent({ nodeId: 1 }),
            );
          }}>
          Hide Node Label
        </button>
        <button
          type="button"
          onClick={() => {
            graphVisualizationController.handleEvent(
              new GraphViewNodeLabelDisplayedEvent({ nodeId: 1 }),
            );
          }}>
          Display Node Label
        </button>
      </section>
    </>
  );
}
