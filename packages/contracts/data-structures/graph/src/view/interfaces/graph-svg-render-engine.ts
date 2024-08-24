import { GraphRenderEvent } from '../data-transfer-objects';

export interface IGraphSVGRenderEngine<T> {
  /**
   * Renders the graph specified by the {@link GraphCreatedEvent} to a svg file.
   *
   * @param {GraphCreatedEvent} GraphCreatedEvent
   */
  render: (event: GraphRenderEvent) => Promise<T>;
}
