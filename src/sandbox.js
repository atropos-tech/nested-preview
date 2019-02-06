import React from "react";
import createReactClass from "create-react-class";
import { render } from "react-dom";
import NestedPreview from "./index";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import { blue, red } from "material-ui/colors";
import createUniqueId from "uuid-v4";

const ALL_ITEMS = [
    {id: "apple", numRows: 15 },
    {id: "pear", numRows: 2 },
    {id: "orange", numRows: 7 },
    {id: "grape", numRows: 20 },
    {id: "banana", numRows: 100 },
    {id: "papaya", numRows: 230 },
];

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
            800
        );
    });
}

const sandboxTheme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: red
    }
});

const Sandbox = createReactClass({
    getInitialState() {
        return { selectedItems: [] };
    },
    handleSelectedItemsChange(selectedItems) {
        this.setState({ selectedItems });
    },
    render() {
        const { selectedItems } = this.state;
        return (
            <MuiThemeProvider theme={ sandboxTheme }>
                <section>
                    <h2>Nested Preview</h2>
                    <div style={ { width: "700px" } }>
                        <NestedPreview
                            value={ selectedItems }
                            onChange={ this.handleSelectedItemsChange }
                            getSuggestedSections={ getSuggestedSections }
                            fetchSectionRows={ fetchRows }
                        />
                    </div>
                </section>
            </MuiThemeProvider>
        );
    }
});

render(<Sandbox />, document.getElementById("sandbox"));
