import React from "react";
import Picker from "./Picker";
import { Button } from "material-ui";
import { func, bool, array } from "prop-types";

function PickerOrButton({ isPicker, onPick, selectedSections, onPickerBlur, onSwitchToPicker, getSuggestedSections, fullWidth }) {
    if (isPicker) {
        return (
            <Picker
                getSuggestedItems={ getSuggestedSections }
                selectedItems={ selectedSections }
                onPick={ onPick }
                onBlur={ onPickerBlur }
                fullWidth={ fullWidth }
                focusOnMount
            />
        );
    }
    return (
        <div style={ { display: "flex", justifyContent: "center", paddingTop: "8px" } }>
            <Button variant="raised" onClick={ onSwitchToPicker }>Add another fruit</Button>
        </div>
    );
}

PickerOrButton.propTypes = {
    isPicker: bool,
    onPick: func.isRequired,
    selectedSections: array.isRequired,
    onPickerBlur: func,
    onSwitchToPicker: func,
    getSuggestedSections: func.isRequired,
    fullWidth: bool
};

export default PickerOrButton;
