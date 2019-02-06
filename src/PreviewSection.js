import React from "react";
import { Typography, Paper, Button, Collapse } from "material-ui";
import { any, func, bool } from "prop-types";

function PickedItemSection({ value, onCollapse, onExpand, onRemove, isExpanded }) {
    return (
        <Paper square>
            <div style={ { display: "flex", alignItems: "center", margin: "0 4px" }}>
                <Typography variant="headline" style={ { flex: "1 1 auto" }}>
                    Details for { value.id } - { isExpanded ? "Expanded" : "Collapsed"}
                </Typography>
                <Button onClick={ () => onRemove(value) }>Remove</Button>
                <Button onClick={ () => onExpand(value) }>Expand</Button>
                <Button onClick={ onCollapse }>Collapse</Button>
            </div>
            <Collapse in={ isExpanded }>
                Here is the lovely content!
            </Collapse>
        </Paper>
    );
}

PickedItemSection.propTypes = {
    value: any,
    onCollapse: func,
    onExpand: func,
    onRemove: func,
    isExpanded: bool
};

export default PickedItemSection;
