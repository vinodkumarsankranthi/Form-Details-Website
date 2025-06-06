import React, { useState, useEffect } from "react";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  MenuItem,
  Select,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./commontemplate.css";

function FilterButton({ columns, rows, setSortedData }) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState([{ column: "", condition: "", value: "" }]);

  //--------------------------------------------------------------------------------
  //Handle Open-close the Filter
  //--------------------------------------------------------------------------------

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //--------------------------------------------------------------------------------
  //Handle the Dropdown select change
  //--------------------------------------------------------------------------------

  const handleFilterChange = (index, e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters[index][name] = value;
      return newFilters;
    });
  };

  //--------------------------------------------------------------------------------
  //Add the Filter rows
  //--------------------------------------------------------------------------------

  const addFilter = () => {
    setFilters((prevFilters) => [
      ...prevFilters,
      { column: "", condition: "", value: "" },
    ]);
  };

  //--------------------------------------------------------------------------------
  //Remove the Filter rows
  //--------------------------------------------------------------------------------

  const removeFilter = (index) => {
    setFilters((prevFilters) => prevFilters.filter((_, i) => i !== index));
  };

  //--------------------------------------------------------------------------------
  //Apply filter function
  //--------------------------------------------------------------------------------

  const applyFilters = () => {
    let newFilteredRows = rows;
  
    filters.forEach((filter) => {
      if (filter.column && filter.condition && filter.value) {
        newFilteredRows = newFilteredRows.filter((row) => {
          const cellValue = row[filter.column];
          const stringCellValue = cellValue !== null && cellValue !== undefined ? cellValue.toString().toLowerCase() : "";
          const filterValue = filter.value.toLowerCase();
          const numericCellValue = parseFloat(cellValue);
          const numericFilterValue = parseFloat(filter.value);
  
          switch (filter.condition) {
            case "contains":
              return stringCellValue.includes(filterValue);
            case "equals":
              return stringCellValue === filterValue;
            case "notEqual":
              return stringCellValue !== filterValue;
            case "lessThan":
              return !isNaN(numericCellValue) && numericCellValue < numericFilterValue;
            case "greaterThan":
              return !isNaN(numericCellValue) && numericCellValue > numericFilterValue;
            default:
              return true;
          }
        });
      }
    });
  
    setSortedData(newFilteredRows);
  };
  
  

  //--------------------------------------------------------------------------------
  //clear all apply Filter
  //--------------------------------------------------------------------------------
  const clearFilters = () => {
    setFilters([{ column: "", condition: "", value: "" }]);
    setSortedData(rows);
    handleClose();
  };

  //--------------------------------------------------------------------------------
  //call the Apply function based on the dropdown changes
  //--------------------------------------------------------------------------------

  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <>
      {/* _____________________Filter Button Container_______________ */}
      <div className="common-border-template" onClick={handleOpen}>
        <FilterAltRoundedIcon className="common-icon-designs" />
        <span className="common-filter-and-sort-responsive">Filter</span>
      </div>
      {/* ____________________________End___________________________ */}
      {/* ____________________________Dialog box Block___________________________ */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="Filter-header-name">Apply Filter</DialogTitle>
        <DialogContent>
          {filters.map((filter, index) => (
            <div key={index} className="Filter-Fields-alinment">
              {filters.length > 1 && (
                <Tooltip title="Delete Filter" arrow>
                  <IconButton onClick={() => removeFilter(index)}>
                    <CloseIcon color="primary" />
                  </IconButton>
                </Tooltip>
              )}
              <Select
                name="column"
                value={filter.column}
                onChange={(e) => handleFilterChange(index, e)}
                displayEmpty
                className="Filter-Field"
              >
                <MenuItem value="" disabled className="menuitems-text-color">
                  Select Column
                </MenuItem>
                {columns.map((column) => (
                  <MenuItem className="menuitems-text-color" key={column.field} value={column.field}>
                    {column.headerName}
                  </MenuItem>
                ))}
              </Select>
              <Select
                name="condition"
                value={filter.condition}
                onChange={(e) => handleFilterChange(index, e)}
                displayEmpty
                className="Filter-Field"
              >
                <MenuItem value="" disabled className="menuitems-text-color">
                  Select Condition
                </MenuItem>
                <MenuItem className="menuitems-text-color" value="contains">Contains</MenuItem>
                <MenuItem className="menuitems-text-color" value="equals">Equals</MenuItem>
                <MenuItem className="menuitems-text-color" value="notEqual">Not Equal</MenuItem>
                <MenuItem className="menuitems-text-color" value="lessThan">Less Than</MenuItem>
                <MenuItem className="menuitems-text-color" value="greaterThan">Greater Than</MenuItem>
              </Select>
              <TextField
                name="value"
                value={filter.value}
                onChange={(e) => handleFilterChange(index, e)}
                placeholder="Filter Value"
                className="Filter-Field"
              />
            </div>
          ))}
        </DialogContent>
        {/* ____________________________End___________________________ */}
        {/* ____________________________Footer___________________________ */}
        <div className="filter-button-footer-button-alignment">
          <Button
            id="button-zoom"
            variant="contained"
            onClick={addFilter}
            color="success"
          >
            <AddIcon className="buttonicons" />
            &nbsp;Add Filter
          </Button>
          <Button
            id="button-zoom"
            variant="contained"
            onClick={clearFilters}
            color="success"
          >
            <DeleteForeverIcon className="buttonicons" />
            &nbsp;Remove All Filters
          </Button>
        </div>
        {/* ____________________________End___________________________ */}
      </Dialog>
    </>
  );
}

export default FilterButton;
