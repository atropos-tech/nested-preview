import React from "react";
import { any } from "prop-types";
import createReactClass from "create-react-class";
import { render } from "react-dom";
import NestedPreview from "./index";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import { blue, red } from "material-ui/colors";

const ALL_ITEMS = [
    {id: "apple", rows: 15 },
    {id: "pear", rows: 2 },
    {id: "orange", rows: 7 },
    {id: "grape", rows: 20 },
    {id: "banana", rows: 500 },
    {id: "papaya", rows: 230 },
];

function getSuggestedSections(searchString, selectedItems = []) {
    return ALL_ITEMS
        .filter(item => item.id.toLowerCase().includes(searchString.toLowerCase()))
        .filter(item => !selectedItems.includes(item));
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
                        />
                    </div>
                </section>
            </MuiThemeProvider>
        );
    }
});

render(<Sandbox />, document.getElementById("sandbox"));
