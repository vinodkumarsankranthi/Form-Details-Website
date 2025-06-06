import React from "react";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";
import { Menu, MenuItem } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver"; // Import saveAs function
import "./commontemplate.css";

function ExportButton({ columns, rows, tableName }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  //--------------------------------------------------------------------------------
  //Handle Open-close Menu items
  //--------------------------------------------------------------------------------
  const handleExportClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //--------------------------------------------------------------------------------
  //Handle Download csv format data
  //--------------------------------------------------------------------------------

  const handleDownloadCSV = () => {
    try {
      const csvData = [
        columns.map((column) => column.headerName), // Headers
        ...rows.map((row) => 
          columns.map((column) => {
            let cell = row[column.field];
            // Convert arrays or objects to string
            if (Array.isArray(cell) || typeof cell === 'object') {
              cell = JSON.stringify(cell);
            }
            // Handle null values
            if (cell === null || cell === undefined) {
              cell = '';
            }
            // Escape double quotes
            cell = cell.toString().replace(/"/g, '""');
            // Enclose in double quotes if it contains a comma or newline
            if (cell.includes(',') || cell.includes('\n')) {
              cell = `"${cell}"`;
            }
            return cell;
          })
        ),
      ];
  
      // Convert data to CSV string
      const csvContent = csvData.map((row) => row.join(",")).join("\n");
  
      // Add BOM to the beginning of the CSV content
      const bom = "\uFEFF";
      const csvContentWithBom = bom + csvContent;
  
      // Create a blob containing the CSV data with UTF-8 BOM
      const blob = new Blob([csvContentWithBom], { type: "text/csv;charset=utf-8;" });
  
      // Trigger the download using file-saver
      saveAs(blob, `${tableName ? `${tableName}-` : ""}Data.csv`);
      handleMenuClose()
  
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  //--------------------------------------------------------------------------------
  //Handle Download Excel format data
  //--------------------------------------------------------------------------------

  const handleDownloadExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      columns.map((column) => column.headerName), // Headers
      ...rows.map((row) => columns.map((column) => row[column.field])), // Data
    ]);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Convert workbook to binary string
    const wbBinary = XLSX.write(wb, { type: "binary", bookType: "xlsx" });

    // Create a blob containing the Excel data
    const blob = new Blob([s2ab(wbBinary)], {
      type: "application/octet-stream",
    });

    // Trigger the download using file-saver
    saveAs(blob, `${tableName ? `${tableName}-` : ""}Data.xlsx`);

    handleMenuClose();
  };

  //--------------------------------------------------------------------------------
  // Convert string to ArrayBuffer
  //--------------------------------------------------------------------------------

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  return (
    <>
      {/* ______________________Export button_________________________ */}
      <div className="common-border-template" onClick={handleExportClick}>
        <SaveAltRoundedIcon className="common-icon-designs" />
        <span className="common-filter-and-sort-responsive">Export</span>
      </div>
      {/* _____________________________End_________________________ */}
      {/* _____________________________MenuItems_________________________ */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem className="menuitems-text-color" onClick={handleDownloadCSV}>Download as CSV</MenuItem>
        <MenuItem className="menuitems-text-color" onClick={handleDownloadExcel}>Download as Excel</MenuItem>
      </Menu>
      {/* _____________________________End_________________________ */}
    </>
  );
}

export default ExportButton;
