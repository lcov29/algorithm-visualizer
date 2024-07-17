import { GraphRenderDirection } from '@algorithm-visualizer/graph-contract';

export type MermaidGraphRenderDirection = 'LR' | 'RL' | 'TB' | 'BT';

/**
 * Maps to the direction key expected by mermaid flowcharts
 * See @link https://mermaid.js.org/syntax/flowchart.html#direction
 */
export const GraphRenderDirectionMap = new Map<
  GraphRenderDirection,
  MermaidGraphRenderDirection
>([
  ['Left-To-Right', 'LR'],
  ['Right-To-Left', 'RL'],
  ['Top-To-Bottom', 'TB'],
  ['Bottom-To-Top', 'BT'],
]);
