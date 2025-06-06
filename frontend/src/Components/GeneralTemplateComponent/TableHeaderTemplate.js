import React, { useState, useEffect } from "react";
import { Avatar, Tooltip, Button } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ExportButton from "./ExportButton";
import TableBodyTemplate from "./TableBodyTemplate";
import ColumnButton from "./ColumnButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import "./commontemplate.css";
import FilterButton from "./FilterButton";

function TableHeaderTemplate({
  rows,
  columns,
  handleEdit,
  customMenuItems,
  deleteApi,
  tableNameForExport,
  is_Manage_Button_Required,
  Manage_button_name,
  handleManageButtonClick,
  switchColumnName,
  swithcUpdateApi,
  dropdownColumnName,
  dropdownUpdateApi,
  SetDataBaseUpdate,
  DefaultColumnNames,
  CloseActionDialog,
  ManageButtonIcon=ManageAccountsIcon
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowCheckBox, setSelectedRowCheckBox] = useState([]);
  const [deleteSelected, setDeleteSelected] = useState(false);
  const [sortedData, setSortedData] = useState(rows || []);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((col) => col.field) ||[]
  );
  // console.log('columns',columns)

  //--------------------------------------------------------------------------------
  //Conver the localstorage data into required format
  //--------------------------------------------------------------------------------
  const SubItemHeading = localStorage.getItem("SubItemHeading");
  const selectedColumns = JSON.parse(localStorage.getItem("SelectedColumns"));

  //--------------------------------------------------------------------------------
  //Initial columns rendr to the table(based on the user selcted columns)
  //--------------------------------------------------------------------------------

  useEffect(() => {
    if (selectedColumns && selectedColumns[SubItemHeading] && selectedColumns[SubItemHeading].length > 0) {
      // Set visible columns based on the selected columns for the current module
      setVisibleColumns(selectedColumns[SubItemHeading]);
    } else if (DefaultColumnNames && DefaultColumnNames.length > 0) {
      // Fallback to default columns if no selection is found
      setVisibleColumns(DefaultColumnNames);
    } else {
      // Fallback to empty array if no selected columns and no default columns are available
      setVisibleColumns([]);
    }
  }, []);

  //--------------------------------------------------------------------------------
  //To triget the Seleted row delete
  //--------------------------------------------------------------------------------
  const handleDeleteSelected = () => {
    setDeleteSelected((prevDeleteSelected) => !prevDeleteSelected);
  };

  return (
    <>
      <div className="table-header-template-top-bar-align">
        {/* ____________Delete seleted_______________ */}
        {selectedRowCheckBox.length > 0 ? (
          <Button
            variant="contained"
            color="error"
            startIcon={<Delete />}
            onClick={handleDeleteSelected}
          >
            Delete Selected
          </Button>
        ) : (
          <>
            {/* _____________________Search container_________ */}
            <div className="common-page-search-container">
              <span className="common-page-search-icon">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="search-input"
              />
            </div>
     
            {is_Manage_Button_Required && (
              <div
                className="common-border-template"
                onClick={handleManageButtonClick}
              >
                <ManageButtonIcon className="common-icon-designs" />
                <span className="common-filter-and-sort-responsive-manage">
                  &nbsp;{Manage_button_name}
                </span>
                <MoreVertIcon className="common-icon-designs" />
              </div>
            )}
            {/* ______________User Avatar_____________________ */}
            <div className="common-table-header-avatar">
              <Tooltip title={"Total Rows"} arrow>
                <Avatar className="common-page-avatar">
                  {sortedData.length || 0}
                </Avatar>
              </Tooltip>
              &nbsp;
              {/* ________________________________end________________________________ */}
              {/* ________________________column selection Button____________________ */}
              <ColumnButton
                columns={columns}
                visibleColumns={visibleColumns}
                setVisibleColumns={setVisibleColumns}
                switchColumnName={switchColumnName}
                dropdownColumnName={dropdownColumnName}
              />
              &nbsp;
              {/*___________________________________end_______________________________ */}
              {/* ________________________Export Button ______________________________ */}
              <ExportButton
                columns={columns}
                rows={rows}
                tableName={tableNameForExport}
              />
              &nbsp;
              {/*___________________________________end_______________________________ */}
              {/* _________________________Filter Button______________________________ */}
              <FilterButton
                columns={columns}
                rows={rows}
                setSortedData={setSortedData}
              />
              {/*___________________________________end_______________________________ */}
            </div>
          </>
        )}
      </div>

      {/* __________________________Table component_______________ */}
      <TableBodyTemplate
        columns={columns}
        rows={rows}
        customMenuItems={customMenuItems}
        handleEdit={handleEdit}
        deleteApi={deleteApi}
        deleteSelected={deleteSelected}
        setSelectedRowCheckBox={setSelectedRowCheckBox}
        selectedRowCheckBox={selectedRowCheckBox}
        sortedData={sortedData}
        setSortedData={setSortedData}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        searchTerm={searchTerm}
        switchColumnName={switchColumnName}
        swithcUpdateApi={swithcUpdateApi}
        dropdownColumnName={dropdownColumnName} // New prop for Dropdown
        dropdownUpdateApi={dropdownUpdateApi} // API endpoint for Dropdown updates
        SetDataBaseUpdate={SetDataBaseUpdate}
        CloseActionDialog={CloseActionDialog}
        DefaultColumnNames={DefaultColumnNames}
        // setVisibleColumns={setVisibleColumns}
        
      />
      {/* __________________________________End_____________________ */}
    </>
  );
}

export default TableHeaderTemplate;
