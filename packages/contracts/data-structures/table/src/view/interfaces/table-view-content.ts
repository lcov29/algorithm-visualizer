import { TableContentHighlightStyleClass } from '../types';

export interface ITableViewContent {
  text: string;
  label?: string;
  highlightClass?: TableContentHighlightStyleClass;
}
