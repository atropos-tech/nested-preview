import React from "react";
import { Typography, Paper, Button, Collapse } from "material-ui";
import PreviewTable from "./PreviewTable";
import { any, func, bool } from "prop-types";

function PreviewSection({ value, onCollapse, onExpand, onRemove, isExpanded, onChangeSection }) {
    return (
        <Paper square>
            <div style={ { display: "flex", alignItems: "center", margin: "0 4px" }}>
                <Typography variant="headline" style={ { flex: "1 1 auto" }}>
                    Details for { value.id }
                </Typography>
                {
                    isExpanded ?
                        <Button onClick={ onCollapse }>Collapse</Button> :
                        <Button onClick={ () => onExpand(value) }>Expand</Button>
                }
                {
                    isExpanded &&
                        <Button onClick={ () => window.alert("export to csv") }>Export to CSV</Button>
                }
                <Button onClick={ () => onRemove(value) }>Remove</Button>
            </div>
            <Collapse in={ isExpanded }>
                <PreviewTable section={ value } onChange={ onChangeSection } />
            </Collapse>
        </Paper>
    );
}

PreviewSection.propTypes = {
    value: any,
    onCollapse: func,
    onExpand: func,
    onRemove: func,
    isExpanded: bool
};

export default PreviewSection;
