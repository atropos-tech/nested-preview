import React from "react";
import { Paper, MenuItem } from "material-ui";
import { bool, string, number, array, func } from "prop-types";

function PickerDropdown({ isOpen, inputValue, highlightedIndex, selectedItems, getItemProps, getSuggestedItems, itemToString }) {
    if ( isOpen ) {
        const visibleItems = getSuggestedItems(inputValue, selectedItems);
        return (
            <Paper square style={{ position: "absolute", width: "100%", zIndex: 100 }}>
                {
                    visibleItems.map((item, index) => {
                        const itemProps = getItemProps({
                            index,
                            item,
                            style: {
                                backgroundColor: highlightedIndex === index ? "lightgray" : "white"
                            },
                        });
                        const itemString = itemToString(item);
                        return (
                            <MenuItem key={ itemString } {...itemProps}>{ itemString }</MenuItem>
                        );
                    })
                }
            </Paper>
        );
    }
    return false;
}

PickerDropdown.propTypes = {
    isOpen: bool,
    inputValue: string,
    highlightedIndex: number,
    selectedItems: array,
    getItemProps: func,
    getSuggestedItems: func,
    itemToString: func
};

export default PickerDropdown;
