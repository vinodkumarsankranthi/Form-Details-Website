import React, { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { baseURL } from "../../http";
import "./commontemplate.css";
import TableHeaderTemplate from "./TableHeaderTemplate";
import axios from "axios";

function SampleCode() {
  const [renderColumns, setRenderColumns] = useState([]);//Set the columns
  const [renderRows, setRenderRows] = useState([]);//Set the rows
  const [dataBaseUpdate, SetDataBaseUpdate] = useState(false);//set the tru every fuctionality completed and Reset to false once get api call
  const [CloseActionDialog, setCloseActionDialog] = useState(false);//Need to close the Action menu dropdown(once fuctionlaity triggered)

  //--------------------------------------------------------------------------------
  //UseEffect To render the Data From the Backend
  //--------------------------------------------------------------------------------
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get(`${baseURL}/getcou`);
        const data = response.data;

        // Assuming data contains `fillable` and the row data
        const columnNames = Object.keys(data[0] || {});
        const columns = columnNames.map((columnName) => ({
          field: columnName,
          headerName: columnName,
        }));
        setRenderColumns(columns);

        // Format rows data
        const rows = data.map((row, index) => ({
          id: index + 1, // Assuming no 'id' field, use the index as a unique identifier
          ...row,
        }));
        setRenderRows(rows);
        SetDataBaseUpdate(false);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    fetchTableData();
  }, [dataBaseUpdate]);

  //--------------------------------------------------------------------------------
  //Additional Functions if the custom menu added(custommenuitems)
  //--------------------------------------------------------------------------------

  const handleView = (row, rowid) => {
    console.log("data", row, rowid);
  };

  const handleView1 = (row, rowid) => {
    console.log("data", row, rowid);
  };

  //--------------------------------------------------------------------------------
  //Add the aditional Customs Menus format(in action menu dropdown)
  //--------------------------------------------------------------------------------
  const customMenuItems = [
    {
      icon: VisibilityIcon, //icon Name (import from the Mui)
      label: "View", //Name of the MenuItem
      onClick: handleView, //Handle the Function(for working )
      IconColor: "green", //Color of the Icon
    },
    {
      icon: VisibilityIcon,
      label: "View1",
      onClick: handleView1,
      IconColor: "red",
    },
  ];

  //--------------------------------------------------------------------------------
  //Handle Edit function in edit(Action Dropdown)
  //--------------------------------------------------------------------------------

  const handleEdit = (rowdata) => {
    console.log("handle Edit functions", rowdata);
  };

  //--------------------------------------------------------------------------------
  //Handle Manage Button Function
  //--------------------------------------------------------------------------------

  const handleAddMoreFunctionality = () => {
    console.log("handle manage button");
  };

  //--------------------------------------------------------------------------------
  //Handle Action dialog (menu)close
  //--------------------------------------------------------------------------------
  const handleActionClose = () => {
    setCloseActionDialog((prevState) => !prevState);
  };

  return (
    <div>
      {/* _______________________Main Component call____________ */}
      <TableHeaderTemplate
        columns={renderColumns} // Columns render with default column if empty
        rows={renderRows} // Rows render
        customMenuItems={customMenuItems} // Addition menu items
        handleEdit={handleEdit}//Handle the Edit function
        deleteApi="deletecourse" // Delete Api
        tableNameForExport="Education-RoadMap" // Export the Data to excel/csv (If name requred for the Excel or Csv)
        is_Manage_Button_Required={true} // Manage button view if addition Items add(in center of the header )
        handleManageButtonClick={handleAddMoreFunctionality} // If optional data required(in center of the header click function )
        Manage_button_name="Manage Table"//Name of the Manage button(in center of the header)
        switchColumnName="isPublished" // Swithc required in the Table(one of the column)
        swithcUpdateApi="updatecourse"// Api to handle the Toggle of the swithc
        dropdownColumnName="isPaid" // Yes or No Dropdown required in the Table(one of the column)
        dropdownUpdateApi="updatecourse"// Api to handle the Dropdown of the (yes or no)
        SetDataBaseUpdate={SetDataBaseUpdate}//Make the Table update when(delete)
        DefaultColumnNames={["id", "Category", "SubCategory"]} // Add to show the columns in a default render
        CloseActionDialog={handleActionClose} //Handle the action dialog close when the functionality complete(action menu container)
      />
      {/* _______________________End_____________________________ */}
    </div>
  );
}

export default SampleCode;
