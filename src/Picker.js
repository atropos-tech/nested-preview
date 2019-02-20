import React from "react";
import createReactClass from "create-react-class";
import Downshift from "downshift";
import PickerInput from "./PickerInput";
import PickerDropdown from "./PickerDropdown";
import { func, bool, array, string } from "prop-types";

function itemToString(item) {
    return item.id;
}

const Picker = createReactClass({
    propTypes: {
        onPick: func.isRequired,
        onBlur: func,
        getSuggestedItems: func.isRequired,
        fullWidth: bool,
        focusOnMount: bool,
        selectedItems: array.isRequired,
        label: string
    },
    componentDidMount() {
        if (this.props.focusOnMount) {
            this.inputRef.focus();
        }
    },
    getInitialState() {
        return { inputValue: "" };
    },
    handleInputChange(inputChangeEvent) {
        this.setState({ inputValue: inputChangeEvent.target.value });
    },
    handlePickItem(itemToAdd) {
        const { onPick } = this.props;
        onPick(itemToAdd);
        this.setState({ inputValue: "" });
    },
    captureInputRef(inputRef) {
        this.inputRef = inputRef;
    },
    render() {
        const { inputValue } = this.state;
        const { fullWidth, getSuggestedItems, onBlur, selectedItems, label } = this.props;
        return (
            <Downshift
                inputValue={ inputValue }
                onSelect={ this.handlePickItem }
                itemToString={ itemToString }
            >
                {
                    ({ getInputProps, ...dropdownProps }) => (
                        <div style={ { position: "relative" } }>
                            <PickerInput
                                { ...getInputProps({ onChange: this.handleInputChange }) }
                                fullWidth={ fullWidth }
                                onBlur={ onBlur }
                                inputRef={ this.captureInputRef }
                                label={ label }
                            />
                            <PickerDropdown
                                itemToString={ itemToString }
                                selectedItems={ selectedItems }
                                getSuggestedItems={ getSuggestedItems }
                                {...dropdownProps}
                            />
                        </div>
                    )
                }
            </Downshift>
        );
    }
});

export default Picker;
