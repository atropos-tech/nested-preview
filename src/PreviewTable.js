import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox, LinearProgress, Typography, Paper } from "material-ui";

function PreviewTableRow({ row, section, onChange }) {
    const { selectedRowIds = [] } = section;
    const handleCheckRow = (changedRow, newState) => {
        const newSelectedRowIds = newState ?
            [ ...selectedRowIds, row.id ] :
            selectedRowIds.filter(rowId => rowId !== row.id);
        onChange({
            ...section,
            selectedRowIds: newSelectedRowIds
        });
    };
    const isChecked = selectedRowIds.includes(row.id);
    return (
        <TableRow key={row.id}>
            <TableCell padding="checkbox">
                <Checkbox
                    onChange={ (changeEvent, newState) => handleCheckRow(row, newState) }
                    checked={ isChecked }
                />
            </TableCell>
            <TableCell numeric>{row.weight}</TableCell><TableCell numeric>{row.timePicked}</TableCell><TableCell numeric>{row.pickerName}</TableCell>
        </TableRow>
    );
}

function PreviewTableHead({ section, onChange }) {
    const { selectedRowIds = [] } = section;
    const handleCheckAll = newState => {
        const newSelectedRowIds = newState ?
            section.rows.map(row => row.id) :
            [];
        onChange({
            ...section,
            selectedRowIds: newSelectedRowIds
        });
    };

    const isEveryRowChecked = selectedRowIds.length === section.rows.length;

    return (
        <TableHead>
            <TableRow style={ { position: "absolute", right: "16px", top: 0, left: 0, backgroundColor: "white", zIndex: 1 }}>
                <TableCell padding="checkbox">
                    <Checkbox
                        onChange={ (changeEvent, newState) => handleCheckAll(newState) }
                        checked={ isEveryRowChecked }
                    />
                </TableCell>
                <TableCell>Weight</TableCell><TableCell>Time picked</TableCell><TableCell>Picker</TableCell>
            </TableRow>
        </TableHead>
    );
}

function PreviewTable({ section, onChange }) {
    if ( !section.rows ) {
        return (
            <div>
                <Typography>Loading rows for { section.id }&hellip;</Typography>
                <LinearProgress />
            </div>
        );
    }
    console.log(section.rows);
    return (        
        <div style={ { position: "relative" } }>
        <Paper style={ { paddingTop: "48px", maxHeight: "250px", overflowY: "auto"  }}>
        <Table>
            <PreviewTableHead section={ section } onChange={ onChange } />
            <TableBody>
                {
                    section.rows.map(row =>
                        (
                            <PreviewTableRow
                                key={ row.id }
                                row={ row }
                                section={ section }
                                onChange={ onChange }
                            />
                        )
                    )
                }
            </TableBody>
        </Table></Paper></div>
    );
}

export default PreviewTable;
