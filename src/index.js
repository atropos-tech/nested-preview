import React from "react";
import { func, array, bool, string } from "prop-types";
import createReactClass from "create-react-class";
import PickerOrButton from "./PickerOrButton";
import PreviewSection from "./PreviewSection";

const NestedPreview = createReactClass({
    propTypes: {
        value: array.isRequired,
        onChange: func.isRequired,
        getSuggestedSections: func.isRequired,
        fullWidth: bool,
        addButtonLabel: string.isRequired,
        typeaheadLabel: string,
        itemToPreviewHeader: func,
        children: func.isRequired
    },
    getInitialState() {
        return { expandedSectionId: false, isPickerFocused: true };
    },
    handleSectionCollapse() {
        this.setState({ expandedSectionId: false });
    },
    handleSectionExpand(sectionToExpand) {
        this.setState({ expandedSectionId: sectionToExpand.id });
    },
    handleSectionRemove(sectionToRemove) {
        const { value, onChange } = this.props;
        const newValue = value.filter(section => section.id !== sectionToRemove.id);
        onChange(newValue);
    },
    handleSectionAdd(sectionToAdd) {
        const { value, onChange } = this.props;
        const newValue = [...value, sectionToAdd];
        onChange(newValue);
        this.setState({ isPickerFocused: false, expandedSectionId: sectionToAdd.id });
    },
    handleSectionChange(updatedSection) {
        const { value, onChange } = this.props;
        const newValue = value.map(section => {
            if (section.id === updatedSection.id) {
                return updatedSection;
            }
            return section;
        });
        onChange(newValue);
    },
    handleSwitchToPicker() {
        this.setState({ isPickerFocused: true, expandedSectionId: false });
    },
    handlePickerBlur() {
        this.setState({ isPickerFocused: false });
    },
    isPickerMode() {
        const { isPickerFocused } = this.state;
        const { value } = this.props;
        return (value.length === 0) || isPickerFocused;
    },
    render() {
        const { value, getSuggestedSections, fullWidth, addButtonLabel, typeaheadLabel, itemToPreviewHeader, children } = this.props;
        const { expandedSectionId } = this.state;
        return (
            <div>
                {
                    value.map(section =>
                        (
                            <PreviewSection
                                key={ section.id }
                                value={ section }
                                isExpanded={ expandedSectionId === section.id }
                                onExpand={ this.handleSectionExpand }
                                onCollapse={ this.handleSectionCollapse }
                                onRemove={ this.handleSectionRemove }
                                onChangeSection={ this.handleSectionChange }
                                renderPreview={ children }
                                label={ itemToPreviewHeader(section) }
                            />
                        )
                    )
                }
                <PickerOrButton
                    onPick={ this.handleSectionAdd }
                    getSuggestedSections={ getSuggestedSections }
                    selectedSections={ value }
                    isPicker={ this.isPickerMode() }
                    onSwitchToPicker={ this.handleSwitchToPicker }
                    onPickerBlur={ this.handlePickerBlur }
                    fullWidth={ fullWidth }
                    addButtonLabel={ addButtonLabel }
                    typeaheadLabel={ typeaheadLabel }
                />
            </div>
        );
    }
});

export default NestedPreview;
