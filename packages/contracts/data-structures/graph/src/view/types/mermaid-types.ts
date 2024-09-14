// see https://mermaid.js.org/syntax/flowchart.html#direction
export type MermaidFlowchartDirection = 'LR' | 'RL' | 'TB' | 'BT';

// see https://mermaid.js.org/syntax/flowchart.html#styling-line-curves
export type MermaidCurveStyle =
  | 'basis'
  | 'bumpX'
  | 'bumpY'
  | 'cardinal'
  | 'catmullRom'
  | 'linear'
  | 'monotoneX'
  | 'monotoneY'
  | 'natural'
  | 'step'
  | 'stepAfter'
  | 'stepBefore';
