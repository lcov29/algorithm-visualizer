export type GraphRenderDirectionText =
  | 'Left-To-Right'
  | 'Right-To-Left'
  | 'Top-To-Bottom'
  | 'Bottom-To-Top';

export type GraphRenderDirection = 'LR' | 'RL' | 'TB' | 'BT';

/**
 * Maps to the direction key expected by mermaid flowcharts
 * See @link https://mermaid.js.org/syntax/flowchart.html#direction
 */
export const GraphRenderDirectionMap = new Map<
  GraphRenderDirectionText,
  GraphRenderDirection
>([
  ['Left-To-Right', 'LR'],
  ['Right-To-Left', 'RL'],
  ['Top-To-Bottom', 'TB'],
  ['Bottom-To-Top', 'BT'],
]);
