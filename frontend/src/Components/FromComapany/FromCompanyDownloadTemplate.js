import React from "react";
import { Menu, MenuItem } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function FromCompanyDownloadTemplate({ anchorEl, setAnchorEl }) {
  //--------------------------------------------------------------------------------
  //handle menu close after export
  //--------------------------------------------------------------------------------
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //--------------------------------------------------------------------------------
  //Download the template
  //--------------------------------------------------------------------------------
  const handleDownload = async (format) => {
    try {
      // Define the column names
      const columnNames = ["company name", "address", "official_mail_id", "phone_number", "contact_person_name"];

      // Create a new workbook
      const wb = XLSX.utils.book_new();

      // Create the first worksheet with column names
      const ws1 = XLSX.utils.aoa_to_sheet([columnNames]);
      XLSX.utils.book_append_sheet(wb, ws1, "Template");

      // Create example rows for the specified columns
      const exampleRow = [
        'Tech Innovations Ltd',
        '1234 Innovation Lane, Tech Park, Cityville, TX',
        'contact@techinnovations.com',
        '9876543210',
        'John Doe',
      ];

      const exampleRow1 = [
        'Green Earth Solutions',
        '789 Eco Street, Green Valley, NY',
        'support@greenearthsolutions.com',
        '+1-234-567-8901',
        'Jane Smith',
    ];

      const ws2 = XLSX.utils.aoa_to_sheet([
        columnNames,
        exampleRow,
        exampleRow1,
      ]);
      XLSX.utils.book_append_sheet(wb, ws2, "Example");

      // Convert workbook to binary string
      const wbBinary = XLSX.write(wb, { type: "binary", bookType: "xlsx" });

      // Convert binary string to Blob
      const blob = new Blob([s2ab(wbBinary)], {
        type: "application/octet-stream",
      });

      // Determine the file extension based on the selected format
      const extension = format === "csv" ? "csv" : "xlsx";

      // Save Blob as file
      saveAs(blob, `From_Company_Upload_template.${extension}`);
    } catch (error) {
      console.error("Error downloading template:", error);
    }
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
      {/* ______________________Jsx for menu items________________________ */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        style={{ marginTop: "-50px" }}
      >
        <MenuItem onClick={() => handleDownload("csv")}>
          Download as CSV
        </MenuItem>
        <MenuItem onClick={() => handleDownload("excel")}>
          Download as Excel
        </MenuItem>
      </Menu>
      {/* ______________________End________________________ */}
    </>
  );
}

export default FromCompanyDownloadTemplate;
