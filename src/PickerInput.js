import React from "react";
import { func, string, bool, object } from "prop-types";
import { TextField } from "material-ui";

function PickerInput({ value, label, onChange, onBlur, inputRef, fullWidth, ...otherProps }) {
    const InputProps = {
        inputProps: {
            ...otherProps
        },
        inputRef
    };

    return (
        <TextField
            fullWidth={ fullWidth }
            label={ label }
            value={ value }
            onChange={ onChange }
            onBlur={ onBlur }
            InputProps={ InputProps }
        />
    );
}

PickerInput.propTypes = {
    value: string.isRequired,
    onChange: func.isRequired,
    onBlur: func,
    inputRef: func,
    fullWidth: bool,
    classes: object,
    label: string
};

PickerInput.defaultProps = {
    fullWidth: false
};

export default PickerInput;
