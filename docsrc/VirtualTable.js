import React from "react";
import createReactClass from "create-react-class";
import { Column, Table } from "react-virtualized";
import Draggable from "react-draggable";
import "style-loader!css-loader!react-virtualized/styles.css";
import { Typography, Checkbox } from "material-ui";

const COLUMN_ROW_INDEX = -1;
const ROW_HEIGHT_IN_PIXELS = 36;

function sum(numbers) {
    return numbers.reduce((a = 0, b = 0) => a + b, 0);
}

function getRowStyle({ index }) {
    if (index === COLUMN_ROW_INDEX) {
        return { borderBottom: "1px solid #000"};
    }
    if (index % 2) {
        return { backgroundColor: "#eee" };
    }
}

function getSelectionColumn(onRowSelect) {

    function TickyBoxCell({ cellData, rowData }) {
        return <Checkbox checked={ cellData } onChange={ event => onRowSelect(rowData, event.target.checked) } color="primary" />;
    }

    return {
        label: "__tickybox__",
        isSelectionColumn: true,
        rowToData: ({ rowData }) => rowData.isTicked,
        CellComponent: TickyBoxCell,
        fixedWidth: 60        
    };
}

function getInitialColumnWidths(columns) {
    const totalColumnWidth = sum(columns.map(column => column.width));
    const widths = {};
    columns.forEach(column => {
        widths[column.label] = column.width / totalColumnWidth;
    });
    return widths;
}

const VirtualTable = createReactClass({
    getInitialState() {
        return {
            widths: getInitialColumnWidths(this.getColumnsToRender())
        };
    },

    getColumnsToRender() {
        const { columns, selectable, onRowSelect } = this.props;
        if ( selectable ) {
            return [ getSelectionColumn(onRowSelect), ...columns ];
        }
        return columns;
    },

    render() {
        const { rows, columns, width, height } = this.props;
        
        return (
            <Table
                width={width}
                height={height}
                headerHeight={ROW_HEIGHT_IN_PIXELS}
                rowHeight={ROW_HEIGHT_IN_PIXELS}
                rowCount={rows.length}
                rowGetter={({ index }) => rows[index]}
                rowStyle={ getRowStyle }
            >
                {
                    this.getColumnsToRender().map(column =>
                        (
                            <Column
                                columnData={ column }
                                headerRenderer={this.headerRenderer}
                                cellRenderer={ column.CellComponent }
                                key={ column.label }
                                dataKey={ column.label }
                                cellDataGetter={ column.rowToData }
                                label={ column.label }
                                width={ this.getColumnWidth(column) }
                                flexGrow={ column.fixedWidth ? 0 : 1 }
                                flexShrink={ column.fixedWidth ? 0 : 1 }
                            />
                        )
                    )
                }
            </Table>
        );
    },

    getColumnWidth(column) {
        const { width } = this.props;
        const { widths } = this.state;
        if ( column.fixedWidth ) {
            console.log(column.fixedWidth);
            return column.fixedWidth;
        }
        console.log(widths, column.label, widths[column.label], width);
        return widths[column.label] * width;
    },

    handleAllCheck(checkEvent) {
        console.log("ALL CHECK", checkEvent);
    },

    headerRenderer({ dataKey, label, columnData }) {        
        if ( columnData.isSelectionColumn ) {
            return (
                <Checkbox checked={ false } onChange={ this.handleAllCheck } />
            );
        }
        return (
            <div key={ dataKey } style={ { display: "flex", justifyContent: "space-between" } }>
                <Typography component="span" style={ { fontWeight: "bold" } } className="ReactVirtualized__Table__headerTruncatedText">
                    {label}
                </Typography>
                <Draggable
                    axis="x"
                    defaultClassName="DragHandle"
                    defaultClassNameDragging="DragHandleActive"
                    onDrag={(event, { deltaX }) =>
                        this.resizeRow({
                            dataKey,
                            deltaX
                        })
                    }
                    position={{ x: 0 }}
                    zIndex={999}
                >
                    <span className="DragHandleIcon">⋮</span>
                </Draggable>
            </div>
        );
    },

    resizeRow({ dataKey, deltaX }) {
        this.setState(prevState => {
            const prevWidths = prevState.widths;
            const percentDelta = deltaX / this.props.width;
            const { columns } = this.props;

            // This is me being lazy :)
            const dataKeyIndex = columns.findIndex(column => column.label === dataKey);
            const nextDataKey = columns[dataKeyIndex + 1];

            return {
                widths: {
                    ...prevWidths,
                    [dataKey]: prevWidths[dataKey] + percentDelta,
                    [nextDataKey]: prevWidths[nextDataKey] - percentDelta
                }
            };
        });
    }
});

export default VirtualTable;
