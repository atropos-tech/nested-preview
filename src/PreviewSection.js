import React from "react";
import { Typography, Paper, Button, Collapse } from "material-ui";
import { any, func, bool, string } from "prop-types";

function PreviewSection({ value, label, renderPreview, onCollapse, onExpand, onRemove, isExpanded }) {
    return (
        <Paper square>
            <div style={ { display: "flex", alignItems: "center", margin: "0 4px" }}>
                <Typography variant="headline" style={ { flex: "1 1 auto" }}>
                    { label }
                </Typography>
                {
                    isExpanded ?
                        <Button onClick={ onCollapse }>Collapse</Button> :
                        <Button onClick={ () => onExpand(value) }>Expand</Button>
                }
                <Button onClick={ () => onRemove(value) }>Remove</Button>
            </div>
            <Collapse in={ isExpanded }>
                {
                    renderPreview(value)
                }
            </Collapse>
        </Paper>
    );
}

PreviewSection.propTypes = {
    value: any,
    onCollapse: func,
    onExpand: func,
    onRemove: func,
    renderPreview: func.isRequired,
    isExpanded: bool,
    label: string
};

export default PreviewSection;
