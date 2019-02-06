import React from "react";
import { func, array } from "prop-types";
import createReactClass from "create-react-class";
import PickerOrButton from "./PickerOrButton";
import PreviewSection from "./PreviewSection";

const NestedPreview = createReactClass({
    propTypes: {
        value: array.isRequired,
        onChange: func.isRequired,
        getSuggestedSections: func.isRequired,
        fetchSectionRows: func.isRequired
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
        this.loadRows(sectionToAdd);
        this.setState({ isPickerFocused: false, expandedSectionId: sectionToAdd.id });
    },
    loadRows(sectionToLoad) {
        if (!sectionToLoad.rows) {
            const { fetchSectionRows } = this.props;
            fetchSectionRows(sectionToLoad).then(rows => {
                const newSection = {
                    ...sectionToLoad,
                    rows
                };
                return this.handleSectionChange(newSection);
            }).catch(error => {
                //what now?
                console.error(error);
            });
        }
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
        const { value, getSuggestedSections } = this.props;
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
                />
            </div>
        );
    }
});

export default NestedPreview;
