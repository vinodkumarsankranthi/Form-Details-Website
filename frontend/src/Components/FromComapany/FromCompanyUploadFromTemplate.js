import React from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { baseURL } from "../../http";
import { customAlert } from "../SweetAlertCommon/Custom";
import FileUploadIcon from "@mui/icons-material/FileUpload";

function FromComapnyUploadFromTemplate({ DBApi, close, update }) {
  //--------------------------------------------------------------------------------
  //handle Upload the file for coursename(excel and csv)
  //--------------------------------------------------------------------------------

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Assuming the data is present in the first sheet (index 0)
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert the worksheet to JSON format
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Required columns
      const requiredColumns = [
        "name",
        "address",
        "official_mail_id",
        "phone_number",
        "contact_person_name",
      ];

      // Modify JSON data to include only the required columns and additional fields
      const modifiedData = jsonData.map((row) => {
        const modifiedRow = {};

        // Add required columns with values from the uploaded data
        requiredColumns.forEach((header) => {
          if (header === "phone_number") {
            // Ensure phone_number is converted to string format
            modifiedRow[header] = String(row[header] || ""); // Convert phone_number to string
          } else {
            modifiedRow[header] = row[header] || ""; // Set value from uploaded data or empty string if missing
          }
        });

        // Add additional fields
        modifiedRow["created_by"] = localStorage.getItem("HTES_user_id");
        modifiedRow["modified_by"] = localStorage.getItem("HTES_user_id");

        return modifiedRow;
      });

      try {
        // Send the modified JSON data to the backend
        const response = await axios.post(baseURL + DBApi, modifiedData);
        console.log(response);

        // Check if the response status is OK (200)
        if (response.status === 200) {
          customAlert("", "Data uploaded successfully and dropped the duplicate project", "success");
          update(true);
          close();
        } else {
          customAlert("","Error uploading data. Please check the template and database connectivity","error");
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          customAlert("","Duplicate record found. Please check and try again.","warning");
        } else {
          customAlert("","Error uploading data. Please check the template and database connectivity","error");
        }
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <div className="from-company-template-add-course-icon">
      {/* ______________________Jsx start______________________ */}
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleUpload}
        style={{ display: "none" }}
        id="upload-file"
      />
      <label htmlFor="upload-file">
        <div>
          <FileUploadIcon
            className="from-company-template-addboxixon-style"
            color="primary"
            fontSize="large"
          />
          <br />
          <span>
            Upload
            <br />
            Project
          </span>
        </div>
      </label>
      {/* ______________________end______________________ */}
    </div>
    </div>
  );
}

export default FromComapnyUploadFromTemplate;
