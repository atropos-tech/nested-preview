import React from "react";
import createReactClass from "create-react-class";
import { render } from "react-dom";
import NestedPreview from "../src/index";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import { blue, red } from "material-ui/colors";
import createUniqueId from "uuid-v4";
import { Typography, LinearProgress } from "material-ui";
import VirtualTable from "./VirtualTable";
import ContainerDimensions from "react-container-dimensions";

const ALL_ITEMS = [
    {id: "apple", numRows: 15 },
    {id: "pear", numRows: 2 },
    {id: "orange", numRows: 7 },
    {id: "grape", numRows: 20 },
    {id: "banana", numRows: 100 },
    {id: "papaya", numRows: 230 },
];

function WeightInGramsCell({ cellData }) {
    return <Typography component="span">{ cellData }g</Typography>;
}

function StringCell({ cellData }) {
    return <Typography component="span">{ cellData }</Typography>;
}

const FRUIT_COLUMNS = [
    {
        label: "weight",
        rowToData: ({ rowData }) => rowData.weight,
        CellComponent: WeightInGramsCell,
        width: 1
    },
    {
        label: "time picked",
        rowToData: ({ rowData }) => rowData.timePicked,
        CellComponent: StringCell,
        width: 1
    },
    {
        label: "picked by",
        rowToData: ({ rowData }) => rowData.pickerName,
        CellComponent: StringCell,
        width: 1
    }
];

const SERVER_DELAY_IN_MILLISECONDS = 800;

function randomBetween(low, high) {
    const difference = high - low;
    return Math.floor(Math.random() * difference) + low;
}

function randomFrom(...array) {
    return array[randomBetween(0, array.length)];
}

function generateRandomRow() {
    return {
        id: createUniqueId(),
        weight: randomBetween(30, 95),
        timePicked: randomFrom("today", "yesterday") + " " + randomBetween(1, 12) + randomFrom("am", "pm"),
        pickerName: randomFrom("fred", "bob", "lana", "phil", "joyce")
    };
}

function getSuggestedSections(searchString, selectedItems = []) {
    return ALL_ITEMS
        .filter(item => item.id.toLowerCase().includes(searchString.toLowerCase()))
        .filter(item => !selectedItems.includes(item));
}

function fetchRows(section) {
    return new Promise(resolve => {
        const rows = Array(section.numRows).fill(true).map(generateRandomRow);
        setTimeout(
            () => resolve(rows),
            SERVER_DELAY_IN_MILLISECONDS
        );
    });
}

const sandboxTheme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: red
    }
});

const Docs = createReactClass({
    getInitialState() {
        return { selectedItems: [], sectionRows: {} };
    },
    handleSelectedItemsChange(selectedItems) {
        this.setState({ selectedItems });
    },
    loadRows(sectionToLoad) {
        if (!sectionToLoad.rows) {
            fetchRows(sectionToLoad).then(rows => {
                this.setState(oldState => ({
                    sectionRows: { ...oldState.sectionRows, [sectionToLoad.id]: rows }
                }));
            }).catch(error => {
                //what now?
                console.error(error);
            });
        }
    },
    render() {
        const { selectedItems, sectionRows } = this.state;
        return (
            <MuiThemeProvider theme={ sandboxTheme }>
                <section>
                    <Typography variant="title">Nested Preview</Typography>
                    <div style={ { width: "700px" } }>
                        <NestedPreview
                            value={ selectedItems }
                            onChange={ this.handleSelectedItemsChange }
                            getSuggestedSections={ getSuggestedSections }
                            addButtonLabel="Add another fruit"
                            typeaheadLabel="Your favourite fruit"
                            itemToPreviewHeader={ section => `Details for "${section.id}"` }
                            fullWidth
                        >
                            {
                                section => {
                                    const loadedRows = sectionRows[section.id];
                                    if ( loadedRows ) {
                                        return (
                                            <ContainerDimensions>
                                                {
                                                    ({ width }) => <VirtualTable rows={ loadedRows } columns={ FRUIT_COLUMNS } height={ 300 } width={ width } />
                                                }
                                            </ContainerDimensions>
                                        );
                                    }
                                    this.loadRows(section);
                                    return <LinearProgress />;
                                }
                            }
                        </NestedPreview>
                    </div>
                </section>
            </MuiThemeProvider>
        );
    }
});

render(<Docs />, document.getElementById("docs"));
