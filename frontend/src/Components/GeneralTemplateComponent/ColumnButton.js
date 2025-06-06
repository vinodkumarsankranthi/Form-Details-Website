import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./commontemplate.css";

function ColumnButton({
  columns,
  visibleColumns,
  setVisibleColumns,
  dropdownColumnName,
  switchColumnName,
}) {
  const [isColumnDialogOpen, setIsColumnDialogOpen] = useState(false);
  const [selectAllColumns, setSelectAllColumns] = useState(false);
  const [searchColumnTerm, setSearchColumnTerm] = useState("");
  const [filteredColumns, setFilteredColumns] = useState([]);

  //--------------------------------------------------------------------------------
  //Handle Open-close Column Selection Dialog
  //--------------------------------------------------------------------------------

  const handleOpenColumn = () => {
    setIsColumnDialogOpen(true);
  };

  useEffect(() => {
    handleSearchColumn("");
  }, [isColumnDialogOpen]);

  const handleCloseColumnDialog = () => {
    setIsColumnDialogOpen(false);
  };

  //--------------------------------------------------------------------------------
  //seach the columns for selcetion to show in the datatable
  //--------------------------------------------------------------------------------
  const handleSearchColumn = (searchColumnTerm) => {
    setSearchColumnTerm(searchColumnTerm);
    const filtered = columns.filter((column) =>
      column.headerName.toLowerCase().includes(searchColumnTerm.toLowerCase())
    );
    setFilteredColumns(filtered);
  };

  //--------------------------------------------------------------------------------
  //Handle  Column checkbox  Selection functions
  //--------------------------------------------------------------------------------
  const handleColumnChange = (field) => {
    setVisibleColumns((prevVisibleColumns) => {
      const newVisibleColumns = prevVisibleColumns.includes(field)
        ? prevVisibleColumns.filter((col) => col !== field)
        : [...prevVisibleColumns, field];

      // Update the selectAllColumns state
      setSelectAllColumns(newVisibleColumns.length === columns.length);
      
      return newVisibleColumns;
    });
  };

  //--------------------------------------------------------------------------------
  //Handle  Column checkbox  all  Selection functions
  //--------------------------------------------------------------------------------
  const handleSelectAllColumns = (event) => {
    const isChecked = event.target.checked;

    // If 'Select All' is checked, select all columns
    const newVisibleColumns = isChecked ? columns.map((col) => col.field) : [];

    setVisibleColumns(newVisibleColumns);
    setSelectAllColumns(isChecked);
  };

  return (
    <>
      {/* _________________Columns name block_________________________ */}
      <div className="common-border-template" onClick={handleOpenColumn}>
        <ViewColumnIcon className="common-icon-designs" />
        <span className="common-filter-and-sort-responsive">Column</span>
      </div>
      {/* _______________________end________________________ */}
      <Dialog open={isColumnDialogOpen} onClose={handleCloseColumnDialog}>
        <DialogTitle className="column-button-modal-container">
          <span className="columns-modal-heading">Select Columns</span>
        </DialogTitle>
        {/*_________________________Search Bar______________________ */}
        <div className="column-button-search-container">
          <div className="common-page-search-container">
            <span className="common-page-search-icon">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={searchColumnTerm}
              onChange={(e) => handleSearchColumn(e.target.value)}
              placeholder="Search Columns..."
              className="search-input"
            />
          </div>
        </div>
        {/* _______________________end________________________ */}

        <DialogContent className="columns-container-heigh-and-width">
          {/*_________________________ Column Checkboxes______________________ */}

          {filteredColumns.map((column, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={visibleColumns.includes(column.field)}
                  onChange={() => handleColumnChange(column.field)}
                  disabled={
                    dropdownColumnName === column.field ||
                    switchColumnName === column.field
                  }
                />
              }
              label={column.headerName}
            />
          ))}
        </DialogContent>
        {/* _______________________end________________________ */}
        <DialogActions className="button-and-selectall-checkbox">
          {/*__________________ "Select All" Checkbox______________________ */}
          <div>
            <span>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectAllColumns}
                    onChange={handleSelectAllColumns}
                  />
                }
                label="Select/Unselect All"
              />
            </span>
            <Button
              id="button-zoom"
              variant="contained"
              onClick={handleCloseColumnDialog}
              color="success"
            >
              <CheckCircleOutlineIcon className="buttonicons" />
              OK
            </Button>
          </div>
          {/* _______________________end________________________ */}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ColumnButton;
