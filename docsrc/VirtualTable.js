import React from "react";
import createReactClass from "create-react-class";
import { Column, Table } from "react-virtualized";
import Draggable from "react-draggable";
import "style-loader!css-loader!react-virtualized/styles.css";
import { Typography } from "material-ui";

const COLUMN_ROW_INDEX = -1;
const ROW_HEIGHT_IN_PIXELS = 36;

function sum(numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}

function getRowStyle({ index }) {
    if (index === COLUMN_ROW_INDEX) {
        return { borderBottom: "1px solid #000"};
    }
    if (index % 2) {
        return { backgroundColor: "#eee" };
    }
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
            widths: getInitialColumnWidths(this.props.columns)
        };
    },

    render() {
        const { rows, columns, width, height } = this.props;
        const { widths } = this.state;

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
                    columns.map(column =>
                        (
                            <Column
                                headerRenderer={this.headerRenderer}
                                cellRenderer={ column.CellComponent }
                                key={ column.label }
                                dataKey={ column.label }
                                cellDataGetter={ column.rowToData }
                                label={ column.label }
                                width={ widths[column.label] * width }
                            />
                        )
                    )
                }
            </Table>
        );
    },

    headerRenderer({ dataKey, label }) {
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
