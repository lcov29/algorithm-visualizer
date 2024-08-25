import { EventSubscriberManager } from '@algorithm-visualizer/event-handling';
import { IEventSubscriber } from '@algorithm-visualizer/event-handling-contract';
import {
  GraphCreatedEvent,
  GraphGeneratorConfig,
  GraphStructureEvent,
  IGraphGenerator,
} from '@algorithm-visualizer/graph-contract';
import { IntegerRange } from '@algorithm-visualizer/integer-range-contract';
import {
  getRandomIntegerBetween,
  getRandomListItem,
} from '@algorithm-visualizer/randomization';

import { EdgeListGenerator } from '../../src/generator/edge-list-generator';
import { GraphGenerator } from '../../src/generator/graph-generator';
import { NodeListGenerator } from '../../src/generator/node-list-generator';
import { EdgeList } from '../../src/structure/edge-list';
import { NodeList } from '../../src/structure/node-list';

// integration test
describe('GraphGenerator', () => {
  let generator: IGraphGenerator;
  let config: GraphGeneratorConfig;
  let subscriberId: number;
  let mockSubscriber: MockGraphCreatedSubscriber;
  let graphCreatedEvent: GraphCreatedEvent | null;

  class MockGraphCreatedSubscriber
    implements IEventSubscriber<GraphStructureEvent>
  {
    async handleEvent(event: GraphStructureEvent) {
      if (event.name === 'graph-created') {
        graphCreatedEvent = event;
      }
    }
  }

  beforeEach(() => {
    jest.resetAllMocks();
    generator = new GraphGenerator({
      createEdgeListGenerator: (nodeIds: number[]) =>
        new EdgeListGenerator({
          edgeList: new EdgeList(),
          getRandomIntegerBetween: getRandomIntegerBetween,
          getRandomListItem: getRandomListItem,
          nodeIds,
        }),
      createNodeListGenerator: () =>
        new NodeListGenerator({
          nodeList: new NodeList(),
          getRandomIntegerBetween: getRandomIntegerBetween,
        }),
      subscriberManager: new EventSubscriberManager(),
    });
    mockSubscriber = new MockGraphCreatedSubscriber();
    config = new GraphGeneratorConfig({
      nodeAmount: new IntegerRange({ min: 3, max: 5 }),
      edgeAmountPerNode: new IntegerRange({ min: 3, max: 5 }),
      edgeWeight: new IntegerRange({ min: 2, max: 7 }),
      allowRecursiveEdges: false,
      edgeDirection: 'unidirectional',
    });
    subscriberId = generator.addSubscriber(mockSubscriber);
    graphCreatedEvent = null;
  });

  describe('addSubscriber()', () => {
    it('adds a subscriber that will be notified about emitted events', () => {
      generator.generateGraph(config);
      expect(graphCreatedEvent!.name).toBe('graph-created');
    });

    it('returns the subscriber id', () => {
      expect(Number.isInteger(subscriberId)).toBe(true);
    });
  });

  describe('removeSubscriber()', () => {
    it('removes the specified subscriber so it will not be notified about emitted events', () => {
      generator.removeSubscriber(subscriberId);
      generator.generateGraph(config);
      expect(graphCreatedEvent).toBeNull();
    });
  });

  describe('generateGraph()', () => {
    it('generates a random graph based on the specified configuration', () => {
      generator.generateGraph(config);

      expect(graphCreatedEvent!.name).toBe('graph-created');

      expect(graphCreatedEvent!.nodes.nodeIds.length).toBeGreaterThanOrEqual(
        config.nodeAmount.min,
      );
      expect(graphCreatedEvent!.nodes.nodeIds.length).toBeLessThanOrEqual(
        config.nodeAmount.max,
      );

      expect(graphCreatedEvent!.edges.edges.length).toBeGreaterThanOrEqual(
        (config.nodeAmount.min * config.edgeAmountPerNode.min) / 2,
      );
      expect(graphCreatedEvent!.edges.edges.length).toBeLessThanOrEqual(
        (config.nodeAmount.max * config.edgeAmountPerNode.max) / 2,
      );

      graphCreatedEvent!.edges.edges.forEach(edge => {
        expect(edge.weight).toBeGreaterThanOrEqual(config.edgeWeight!.min);
        expect(edge.weight).toBeLessThanOrEqual(config.edgeWeight!.max);
      });

      graphCreatedEvent!.edges.edges.forEach(edge => {
        expect(edge.isDirected).toBe(true);
      });
    });
  });
});
