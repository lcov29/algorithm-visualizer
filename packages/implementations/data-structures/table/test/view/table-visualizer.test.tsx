import { FunctionValidator } from '@algorithm-visualizer/data-validation';
import { EventHandlerChain } from '@algorithm-visualizer/event-handling';
import {
  ITableViewContent,
  TableCellHighlightStyleClass,
  TableContentHighlightStyleClass,
  TableViewCellHighlightAddedEvent,
  TableViewCellHighlightRemovedEvent,
  TableViewColumnHighlightAddedEvent,
  TableViewColumnHighlightRemovedEvent,
  TableViewColumnsSwitchedEvent,
  TableViewContentHighlightAddedEvent,
  TableViewContentHighlightRemovedEvent,
  TableViewContentUpdatedEvent,
  TableViewEvent,
  TableViewInitializedEvent,
  TableViewRowHighlightAddedEvent,
  TableViewRowHighlightRemovedEvent,
  TableViewRowsSwitchedEvent,
} from '@algorithm-visualizer/table-contract';

import { TableViewModel } from '../../src/view/table-view-model';
import { TableVisualizer } from '../../src/view/table-visualizer';

const mockChangeCellHighlight = jest.fn();
const mockChangeColumnHighlight = jest.fn();
const mockSwitchColumns = jest.fn();
const mockChangeContentHighlight = jest.fn();
const mockChangeContent = jest.fn();
const mockChangeRowHighlight = jest.fn();
const mockSwitchRows = jest.fn();
const mockInitializeTableData = jest.fn();

jest.mock('../../src/view/table-view-model', () => {
  return {
    TableViewModel: jest.fn().mockImplementation(() => {
      return {
        changeCellHighlight: mockChangeCellHighlight,
        changeColumnHighlight: mockChangeColumnHighlight,
        switchColumns: mockSwitchColumns,
        changeContentHighlight: mockChangeContentHighlight,
        changeContent: mockChangeContent,
        changeRowHighlight: mockChangeRowHighlight,
        switchRows: mockSwitchRows,
        initializeTableData: mockInitializeTableData,
      };
    }),
  };
});

describe('TableVisualizer', () => {
  let visualizer: TableVisualizer;

  const model = new TableViewModel();
  const eventHandlerChain = new EventHandlerChain<TableViewEvent>({
    abortAfterSuccess: true,
    validator: new FunctionValidator(),
  });

  const tableData: Omit<ITableViewContent, 'highlightClass'>[][][] = [
    [
      [
        { label: 'Label_1.1.1', text: 'Text_1.1.1' },
        { label: 'Label_1.1.2', text: 'Text_1.1.2' },
      ],
      [{ label: 'Label_1.2.1', text: 'Text_1.2.1' }],
    ],
    [
      [{ label: 'Label_2.1.1', text: 'Text_2.1.1' }],
      [{ label: 'Label_2.2.1', text: 'Text_2.2.1' }],
    ],
  ];

  beforeEach(() => {
    jest.resetAllMocks();
    visualizer = new TableVisualizer({ eventHandlerChain, model });
  });

  describe('handleEvent()', () => {
    describe.each([
      [
        'TableViewCellHighlightAddedEvent',
        'changeCellHighlight',
        {
          rowId: 0,
          columnId: 1,
          highlightClass:
            'tableCellHighlightStyle1' as TableCellHighlightStyleClass,
        },
        new TableViewCellHighlightAddedEvent({
          rowId: 0,
          columnId: 1,
          highlightClass:
            'tableCellHighlightStyle1' as TableCellHighlightStyleClass,
        }),
        mockChangeCellHighlight,
      ],
      [
        'TableViewCellHighlightRemovedEvent',
        'changeCellHighlight',
        {
          rowId: 0,
          columnId: 1,
        },
        new TableViewCellHighlightRemovedEvent({ rowId: 0, columnId: 1 }),
        mockChangeCellHighlight,
      ],
      [
        'TableViewColumnHighlightAddedEvent',
        'changeColumnHighlight',
        {
          columnId: 1,
          highlightClass: 'tableCellHighlightStyle1',
        },
        new TableViewColumnHighlightAddedEvent({
          columnId: 1,
          highlightClass: 'tableCellHighlightStyle1',
        }),
        mockChangeColumnHighlight,
      ],
      [
        'TableViewColumnHighlightRemovedEvent',
        'changeColumnHighlight',
        {
          columnId: 1,
        },
        new TableViewColumnHighlightRemovedEvent({ columnId: 1 }),
        mockChangeColumnHighlight,
      ],
      [
        'TableViewColumnsSwitchedEvent',
        'switchColumns',
        { columnAId: 3, columnBId: 7 },
        new TableViewColumnsSwitchedEvent({ columnAId: 3, columnBId: 7 }),
        mockSwitchColumns,
      ],
      [
        'TableViewContentHighlightAddedEvent',
        'changeContentHighlight',
        {
          rowId: 0,
          columnId: 1,
          contentId: 2,
          highlightClass:
            'tableContentHighlightStyle1' as TableContentHighlightStyleClass,
        },
        new TableViewContentHighlightAddedEvent({
          rowId: 0,
          columnId: 1,
          contentId: 2,
          highlightClass:
            'tableContentHighlightStyle1' as TableContentHighlightStyleClass,
        }),
        mockChangeContentHighlight,
      ],
      [
        'TableViewContentHighlightRemovedEvent',
        'changeContentHighlight',
        {
          rowId: 0,
          columnId: 1,
          contentId: 2,
        },
        new TableViewContentHighlightRemovedEvent({
          rowId: 0,
          columnId: 1,
          contentId: 2,
        }),
        mockChangeContentHighlight,
      ],
      [
        'TableViewContentUpdatedEvent',
        'changeContent',
        {
          rowId: 0,
          columnId: 1,
          newContent: [{ label: 'newLabel', text: 'newText' }],
        },
        new TableViewContentUpdatedEvent({
          rowId: 0,
          columnId: 1,
          newContent: [{ label: 'newLabel', text: 'newText' }],
        }),
        mockChangeContent,
      ],
      [
        'TableViewRowHighlightAddedEvent',
        'changeRowHighlight',
        {
          rowId: 0,
          highlightClass:
            'tableCellHighlightStyle1' as TableCellHighlightStyleClass,
        },
        new TableViewRowHighlightAddedEvent({
          rowId: 0,
          highlightClass: 'tableCellHighlightStyle1',
        }),
        mockChangeRowHighlight,
      ],
      [
        'TableViewRowHighlightRemovedEvent',
        'changeRowHighlight',
        { rowId: 3 },
        new TableViewRowHighlightRemovedEvent({ rowId: 3 }),
        mockChangeRowHighlight,
      ],
      [
        'TableViewRowsSwitchedEvent',
        'switchRows',
        { rowAId: 1, rowBId: 4 },
        new TableViewRowsSwitchedEvent({ rowAId: 1, rowBId: 4 }),
        mockSwitchRows,
      ],
      [
        'TableViewInitializedEvent',
        'initializeTableData',
        tableData,
        new TableViewInitializedEvent({ table: tableData }),
        mockInitializeTableData,
      ],
    ])('%s', (_, modelMethodName, eventArgs, event, modelMethodMock) => {
      it(`passes the event properties to method model.${modelMethodName}`, async () => {
        await visualizer.handleEvent(event);
        expect(modelMethodMock).toHaveBeenCalledTimes(1);
        expect(modelMethodMock).toHaveBeenCalledWith(eventArgs);
      });
    });
  });
});
