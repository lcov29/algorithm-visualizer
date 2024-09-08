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
      .add(event => this._handleTableViewCellHighlightAddedEvent(event))
      .add(event => this._handleTableViewCellHighlightRemovedEvent(event))
      .add(event => this._handleTableViewColumnHighlightAddedEvent(event))
      .add(event => this._handleTableViewColumnHighlightRemovedEvent(event))
      .add(event => this._handleTableViewColumnsSwitchedEvent(event))
      .add(event => this._handleTableViewContentHighlightAddedEvent(event))
      .add(event => this._handleTableViewContentHighlightRemovedEvent(event))
      .add(event => this._handleTableViewContentUpdatedEvent(event))
      .add(event => this._handleTableViewRowHighlightAddedEvent(event))
      .add(event => this._handleTableViewRowHighlightRemovedEvent(event))
      .add(event => this._handleTableViewRowsSwitchedEvent(event))
      .add(event => this._handleTableViewInitializedEvent(event))
      .add(event => this._handleTableViewRenderedEvent(event));
  }

  private async _handleTableViewCellHighlightAddedEvent(event: TableViewEvent) {
    if (event.name !== 'table-view-cell-highlight-added') {
      return false;
    }
    const { rowId, columnId, highlightClass } = event;
    this._tableModel.changeCellHighlight({ rowId, columnId, highlightClass });
    return true;
  }

  private async _handleTableViewCellHighlightRemovedEvent(
    event: TableViewEvent,
  ) {
    if (event.name !== 'table-view-cell-highlight-removed') {
      return false;
    }
    const { rowId, columnId } = event;
    this._tableModel.changeCellHighlight({ rowId, columnId });
    return true;
  }

  private async _handleTableViewColumnHighlightAddedEvent(
    event: TableViewEvent,
  ) {
    if (event.name !== 'table-view-column-highlight-added') {
      return false;
    }
    const { columnId, highlightClass } = event;
    this._tableModel.changeColumnHighlight({ columnId, highlightClass });
    return true;
  }

  private async _handleTableViewColumnHighlightRemovedEvent(
    event: TableViewEvent,
  ) {
    if (event.name !== 'table-view-column-highlight-removed') {
      return false;
    }
    this._tableModel.changeColumnHighlight({ columnId: event.columnId });
    return true;
  }

  private async _handleTableViewColumnsSwitchedEvent(event: TableViewEvent) {
    if (event.name !== 'table-view-columns-switched') {
      return false;
    }
    const { columnAId, columnBId } = event;
    this._tableModel.switchColumns({ columnAId, columnBId });
    return true;
  }

  private async _handleTableViewContentHighlightAddedEvent(
    event: TableViewEvent,
  ) {
    if (event.name !== 'table-view-content-highlight-added') {
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

  private async _handleTableViewContentHighlightRemovedEvent(
    event: TableViewEvent,
  ) {
    if (event.name !== 'table-view-content-highlight-removed') {
      return false;
    }
    const { rowId, columnId, contentId } = event;
    this._tableModel.changeContentHighlight({ rowId, columnId, contentId });
    return true;
  }

  private async _handleTableViewContentUpdatedEvent(event: TableViewEvent) {
    if (event.name !== 'table-view-content-updated') {
      return false;
    }
    const { rowId, columnId, newContent } = event;
    this._tableModel.changeContent({ rowId, columnId, newContent });
    return true;
  }

  private async _handleTableViewRowHighlightAddedEvent(event: TableViewEvent) {
    if (event.name !== 'table-view-row-highlight-added') {
      return false;
    }
    const { rowId, highlightClass } = event;
    this._tableModel.changeRowHighlight({ rowId, highlightClass });
    return true;
  }

  private async _handleTableViewRowHighlightRemovedEvent(
    event: TableViewEvent,
  ) {
    if (event.name !== 'table-view-row-highlight-removed') {
      return false;
    }
    this._tableModel.changeRowHighlight({ rowId: event.rowId });
    return true;
  }

  private async _handleTableViewRowsSwitchedEvent(event: TableViewEvent) {
    if (event.name !== 'table-view-rows-switched') {
      return false;
    }
    const { rowAId, rowBId } = event;
    this._tableModel.switchRows({ rowAId, rowBId });
    return true;
  }

  private async _handleTableViewInitializedEvent(event: TableViewEvent) {
    if (event.name !== 'table-view-initialized') {
      return false;
    }
    this._tableModel.initializeTableData(event.table);
    return true;
  }

  private async _handleTableViewRenderedEvent(event: TableViewEvent) {
    if (event.name !== 'table-view-rendered') {
      return false;
    }
    const tableData = this._tableModel.getTableData();
    if (this._setTableData) {
      this._setTableData(tableData);
    }
    return true;
  }
}
