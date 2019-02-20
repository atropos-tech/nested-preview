import React from "react";
import Picker from "./Picker";
import { Button } from "material-ui";
import { func, bool, array, string } from "prop-types";

function PickerOrButton({ isPicker, addButtonLabel, typeaheadLabel, onPick, selectedSections, onPickerBlur, onSwitchToPicker, getSuggestedSections, fullWidth }) {
    if (isPicker) {
        return (
            <Picker
                getSuggestedItems={ getSuggestedSections }
                selectedItems={ selectedSections }
                onPick={ onPick }
                onBlur={ onPickerBlur }
                fullWidth={ fullWidth }
                label={ typeaheadLabel }
                focusOnMount
            />
        );
    }
    return (
        <div style={ { display: "flex", justifyContent: "center", paddingTop: "8px" } }>
            <Button variant="raised" onClick={ onSwitchToPicker }>{ addButtonLabel }</Button>
        </div>
    );
}

PickerOrButton.propTypes = {
    isPicker: bool,
    typeaheadLabel: string,
    addButtonLabel: string.isRequired,
    onPick: func.isRequired,
    selectedSections: array.isRequired,
    onPickerBlur: func,
    onSwitchToPicker: func,
    getSuggestedSections: func.isRequired,
    fullWidth: bool
};

export default PickerOrButton;
