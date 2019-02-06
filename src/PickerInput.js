import React from "react";
import { func, string, bool, object } from "prop-types";
import { TextField } from "material-ui";

function PickerInput({ value, onChange, onBlur, inputRef, fullWidth, ...otherProps }) {
    const InputProps = {
        inputProps: {
            ...otherProps,
            onBlur
        },
        inputRef
    };

    return (
        <TextField
            fullWidth={ fullWidth }
            label='Your favourite fruit'
            value={ value }
            onChange={ onChange }
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
    classes: object
};

PickerInput.defaultProps = {
    fullWidth: false
};

export default PickerInput;
