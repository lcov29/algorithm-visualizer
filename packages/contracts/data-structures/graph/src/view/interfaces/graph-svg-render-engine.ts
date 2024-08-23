import { GraphCreatedEvent } from '../../generator';

export interface IGraphSVGRenderEngine<T> {
  /**
   * Renders the graph specified by the {@link GraphCreatedEvent} to a svg file.
   *
   * @param {GraphCreatedEvent} GraphCreatedEvent
   */
  render: (event: GraphCreatedEvent) => Promise<T>;
}
