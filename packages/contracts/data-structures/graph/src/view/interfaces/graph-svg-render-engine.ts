export interface IGraphSVGRenderEngine<T> {
  /**
   * Renders the graph specified by the passed mermaid graph definition to a svg file.
   */
  render: (mermaidGraphDefinition: string) => Promise<T>;
}
