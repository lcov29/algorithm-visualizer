import { GraphCreatedEvent } from '../events';

export interface IGraphSVGRenderEngine<T> {
  /**
   * Renders the graph specified by the {@link GraphCreatedEvent} to a svg file.
   *
   * @param {GraphCreatedEvent} GraphCreatedEvent
   */
  render: (event: GraphCreatedEvent) => Promise<T>;
}
