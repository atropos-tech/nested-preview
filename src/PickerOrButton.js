import React from "react";
import Picker from "./Picker";
import { Button } from "material-ui";
import { func, bool, array } from "prop-types";

function PickerOrButton({ isPicker, onPick, selectedSections, onPickerBlur, onSwitchToPicker, getSuggestedSections }) {
    if (isPicker) {
        return (
            <Picker
                getSuggestedItems={ getSuggestedSections }
                selectedItems={ selectedSections }
                onPick={ onPick }
                onBlur={ onPickerBlur }
                focusOnMount
            />
        );
    }
    return <Button onClick={ onSwitchToPicker }>Add another fruit</Button>;
}

PickerOrButton.propTypes = {
    isPicker: bool,
    onPick: func.isRequired,
    selectedSections: array.isRequired,
    onPickerBlur: func,
    onSwitchToPicker: func,
    getSuggestedSections: func.isRequired
};

export default PickerOrButton;
