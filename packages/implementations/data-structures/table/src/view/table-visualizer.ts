import { IEventHandlerChain } from '@algorithm-visualizer/event-handling-contract';
import {
  ITableCell,
  ITableViewModel,
  ITableVisualizer,
  TableViewEvent,
} from '@algorithm-visualizer/table-contract';

type ReactStateSetter = React.Dispatch<
  React.SetStateAction<ITableCell[][] | null>
>;

interface ITableVisualizerArgs {
  model: ITableViewModel;
  eventHandlerChain: IEventHandlerChain<TableViewEvent>;
}

export class TableVisualizer implements ITableVisualizer {
  private _eventHandlerChain: IEventHandlerChain<TableViewEvent>;
  private _tableModel: ITableViewModel;
  private _setTableData: ReactStateSetter | null;

  constructor(args: ITableVisualizerArgs) {
    this._eventHandlerChain = args.eventHandlerChain;
    this._tableModel = args.model;
    this._setTableData = null;
    this._initializeEventHandlerChain();
  }

  setTableDataSetter(setter: ReactStateSetter) {
    this._setTableData = setter;
  }

  async handleEvent(event: TableViewEvent) {
    await this._eventHandlerChain.handle(event);
  }

  private _initializeEventHandlerChain() {
    this._eventHandlerChain
      .add(event => this._handleCellHighlightAddedEvent(event))
      .add(event => this._handleCellHighlightRemovedEvent(event))
      .add(event => this._handleColumnHighlightAddedEvent(event))
      .add(event => this._handleColumnHighlightRemovedEvent(event))
      .add(event => this._handleColumnsSwitchedEvent(event))
      .add(event => this._handleContentHighlightAddedEvent(event))
      .add(event => this._handleContentHighlightRemovedEvent(event))
      .add(event => this._handleContentUpdatedEvent(event))
      .add(event => this._handleRowHighlightAddedEvent(event))
      .add(event => this._handleRowHighlightRemovedEvent(event))
      .add(event => this._handleRowsSwitchedEvent(event))
      .add(event => this._handleTableInitializedEvent(event))
      .add(event => this._handleTableRenderedEvent(event));
  }

  private async _handleCellHighlightAddedEvent(event: TableViewEvent) {
    if (event.name !== 'table-cell-highlight-added') {
      return false;
    }
    const { rowId, columnId, highlightClass } = event;
    this._tableModel.changeCellHighlight({ rowId, columnId, highlightClass });
    return true;
  }

  private async _handleCellHighlightRemovedEvent(event: TableViewEvent) {
    if (event.name !== 'table-cell-highlight-removed') {
      return false;
    }
    const { rowId, columnId } = event;
    this._tableModel.changeCellHighlight({ rowId, columnId });
    return true;
  }

  private async _handleColumnHighlightAddedEvent(event: TableViewEvent) {
    if (event.name !== 'table-column-highlight-added') {
      return false;
    }
    const { columnId, highlightClass } = event;
    this._tableModel.changeColumnHighlight({ columnId, highlightClass });
    return true;
  }

  private async _handleColumnHighlightRemovedEvent(event: TableViewEvent) {
    if (event.name !== 'table-column-highlight-removed') {
      return false;
    }
    this._tableModel.changeColumnHighlight({ columnId: event.columnId });
    return true;
  }

  private async _handleColumnsSwitchedEvent(event: TableViewEvent) {
    if (event.name !== 'table-columns-switched') {
      return false;
    }
    const { columnAId, columnBId } = event;
    this._tableModel.switchColumns({ columnAId, columnBId });
    return true;
  }

  private async _handleContentHighlightAddedEvent(event: TableViewEvent) {
    if (event.name !== 'table-content-highlight-added') {
      return false;
    }
    const { rowId, columnId, contentId, highlightClass } = event;
    this._tableModel.changeContentHighlight({
      rowId,
      columnId,
      contentId,
      highlightClass,
    });
    return true;
  }

  private async _handleContentHighlightRemovedEvent(event: TableViewEvent) {
    if (event.name !== 'table-content-highlight-removed') {
      return false;
    }
    const { rowId, columnId, contentId } = event;
    this._tableModel.changeContentHighlight({ rowId, columnId, contentId });
    return true;
  }

  private async _handleContentUpdatedEvent(event: TableViewEvent) {
    if (event.name !== 'table-content-updated') {
      return false;
    }
    const { rowId, columnId, newContent } = event;
    this._tableModel.changeContent({ rowId, columnId, newContent });
    return true;
  }

  private async _handleRowHighlightAddedEvent(event: TableViewEvent) {
    if (event.name !== 'table-row-highlight-added') {
      return false;
    }
    const { rowId, highlightClass } = event;
    this._tableModel.changeRowHighlight({ rowId, highlightClass });
    return true;
  }

  private async _handleRowHighlightRemovedEvent(event: TableViewEvent) {
    if (event.name !== 'table-row-highlight-removed') {
      return false;
    }
    this._tableModel.changeRowHighlight({ rowId: event.rowId });
    return true;
  }

  private async _handleRowsSwitchedEvent(event: TableViewEvent) {
    if (event.name !== 'table-rows-switched') {
      return false;
    }
    const { rowAId, rowBId } = event;
    this._tableModel.switchRows({ rowAId, rowBId });
    return true;
  }

  private async _handleTableInitializedEvent(event: TableViewEvent) {
    if (event.name !== 'table-initialized') {
      return false;
    }
    this._tableModel.initializeTableData(event.table);
    return true;
  }

  private async _handleTableRenderedEvent(event: TableViewEvent) {
    if (event.name !== 'table-rendered') {
      return false;
    }
    const tableData = this._tableModel.getTableData();
    if (this._setTableData) {
      this._setTableData(tableData);
    }
    return true;
  }
}
