import React, { useState, useEffect,useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  Checkbox,
  Menu,
  Tooltip,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { customAlert } from "../SweetAlertCommon/Custom";
import { baseURL } from "../../http";
import axios from "axios";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DynamicMenuItem from "./DynamicMenuItemsAdd";
import { Switch } from "@mui/material";
import "./commontemplate.css";
import ProcessProgressCircle from "../ProcessProgressCircle/ProcessProgressCircle";



const isURL = (text) => {
   // Ensure that text is a string
   if (typeof text !== 'string') {
    return false;
}

// Check if the text contains an "@" symbol, which typically indicates an email address
if (text.includes("@")) {
    return false;
}

  // Regular expression to match URL patterns
  const urlPattern = /^(http:\/\/|https:\/\/|www\.|.*\.(com|in|net|org|edu|gov))/i;
  return urlPattern.test(text);
};

const formatURL = (text) => {
  // Add https:// if the URL does not have a protocol
  return text.startsWith('http://') || text.startsWith('https://') 
    ? text 
    : `https://${text}`;
};

function TableBodyTemplate({
  rows,
  columns,
  handleEdit,
  customMenuItems,
  deleteApi,
  deleteSelected,
  setSelectedRowCheckBox,
  selectedRowCheckBox,
  setSortedData,
  sortedData,
  visibleColumns,
  searchTerm,
  switchColumnName, // New prop
  swithcUpdateApi,
  dropdownColumnName, // New prop for Dropdown
  dropdownUpdateApi, // API endpoint for Dropdown updates
  SetDataBaseUpdate,
  CloseActionDialog,
  DefaultColumnNames
}) {
  //--------------------------------------------------------------------------------
  // State for the Handling the data
  //--------------------------------------------------------------------------------
  const isInitialized = useRef(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [switchStates, setSwitchStates] = useState({});
  const [dropdownStates, setDropdownStates] = useState({});

  const SubItemHeading = localStorage.getItem("SubItemHeading");
  // const selectedColumnsData = JSON.parse(localStorage.getItem("SelectedColumns")) || {};
  // selectedColumnsData[SubItemHeading] = visibleColumns;
  // localStorage.setItem("SelectedColumns", JSON.stringify(selectedColumnsData));
  // localStorage.setItem("SelectedColumns", JSON.stringify(visibleColumns));
  
  function updateSelectedColumns(subItemHeading, visibleColumns) {
    // Retrieve existing SelectedColumns data or initialize it as an empty object
    let selectedColumnsData = JSON.parse(localStorage.getItem("SelectedColumns")) || {};

    // Update the entry for the specific SubItemHeading
    selectedColumnsData[subItemHeading] = visibleColumns;

    // Save the updated data back to localStorage
    localStorage.setItem("SelectedColumns", JSON.stringify(selectedColumnsData));
}

useEffect(() => {
  if (SubItemHeading && visibleColumns) {
      updateSelectedColumns(SubItemHeading, visibleColumns);
  }
}, [SubItemHeading, visibleColumns]);

  //--------------------------------------------------------------------------------
  //Trigger the functionality when seach and sort called
  //--------------------------------------------------------------------------------
  useEffect(() => {
    let filteredData = rows;
    if (searchTerm) {
      filteredData = rows.filter((row) => {
        const values = Object.values(row);
        return values.some((value) => {
          if (value === null || value === undefined) {
            return false;
          }
          return value
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        });
      });
    }

    if (sortConfig.key) {
      filteredData = filteredData.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === switchColumnName) {
          aValue = switchStates[a.id] ? 1 : 0;
          bValue = switchStates[b.id] ? 1 : 0;
        }

        if (sortConfig.key === dropdownColumnName) {
          aValue = dropdownStates[a.id];
          bValue = dropdownStates[b.id];
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setSortedData(filteredData);
  }, [rows, searchTerm, sortConfig, switchStates, dropdownStates]);

  //--------------------------------------------------------------------------------
  // Trigger the Delete Function
  //--------------------------------------------------------------------------------

  useEffect(() => {
    handleDelete();
  }, [deleteSelected]);

  //--------------------------------------------------------------------------------
  // Delete the Row from the database(seleted and single)
  //--------------------------------------------------------------------------------

  const handleDelete = (id = null) => {
    handleClose();
    setLoading(true);
    if (id) {
      axios
        .delete(`${baseURL}/${deleteApi}/${id}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          if (response.status === 200) {
            customAlert("", "Row Deleted successfully", "success");           
            SetDataBaseUpdate(true);
            
          } else {
            customAlert("", "Failed to delete item", "error");
          }
        })
        .catch((error) => {
          customAlert("", "Server Down", "error");
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      if (!selectedRowCheckBox || selectedRowCheckBox.length === 0) {
        setLoading(false);
        return;
      }
      let deletionCount = 0;
      selectedRowCheckBox.forEach((selectedId, index, array) => {
        axios
          .delete(`${baseURL}/${deleteApi}/${selectedId}`, {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            if (response.status === 200) {
              deletionCount++;
              if (deletionCount === array.length) {
                customAlert(
                  "",
                  `Deleted ${deletionCount} Selected rows successfully`,
                  "success"
                );
                handleClose();
                setLoading(false);
                SetDataBaseUpdate(true);
              }
            } else {
              customAlert("", "Failed to delete item", "error");
            }
          })
          .catch((error) => {
            customAlert("", "Server Down", "error");
            setLoading(false);
          });
      });
      setSelectedRowCheckBox([]);
    }
  };

  //--------------------------------------------------------------------------------
  // Handle the "select all" checkbox(header checkbox)
  //--------------------------------------------------------------------------------

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allRowIds = rows.map((row) => row.id);
      setSelectedRowCheckBox(allRowIds);
    } else {
      setSelectedRowCheckBox([]);
    }
  };

  //--------------------------------------------------------------------------------
  // Handle individual row selection checkbox(rows checkbox)
  //--------------------------------------------------------------------------------

  const handleRowSelect = (event, id) => {
    if (event.target.checked) {
      setSelectedRowCheckBox((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedRowCheckBox((prevSelected) =>
        prevSelected.filter((rowId) => rowId !== id)
      );
    }
  };

  //--------------------------------------------------------------------------------
  // Function to handle open the menu
  //--------------------------------------------------------------------------------

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId((prevSelected) => [...prevSelected, id]); // Preserve array format
  };

  //--------------------------------------------------------------------------------
  // Function to handle close the menu
  //--------------------------------------------------------------------------------

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRowId([]); // Reset to an empty array
  };

  useEffect(() => {
    handleClose();
  }, [CloseActionDialog]);

  //--------------------------------------------------------------------------------
  // Handle Sort
  //--------------------------------------------------------------------------------

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  //--------------------------------------------------------------------------------
  // Handle Switch Change
  //--------------------------------------------------------------------------------

  const handleSwitchChange = (event, row) => {
    const newStatus = event.target.checked;
    const previousStatus = switchStates[row.id]; // Store the previous state
  
    // Optimistically update the UI
    const updatedSwitchStates = {
      ...switchStates,
      [row.id]: newStatus,
    };
    setSwitchStates(updatedSwitchStates);
  
    const updatedRow = {
      ...row,
      [switchColumnName]: newStatus ? 1 : 0,
      [dropdownColumnName]: dropdownStates[row.id],
    };
  
    axios
      .put(`${baseURL}/${swithcUpdateApi}/${row.id}`, updatedRow, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 200) {
          customAlert("", "Updated Successfully", "success");
          SetDataBaseUpdate(true);
        } else {
          customAlert("", "Failed to update", "error");
          // Revert to previous state
          setSwitchStates((prevStates) => ({
            ...prevStates,
            [row.id]: previousStatus,
          }));
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data.error;
          customAlert("", errorMessage, "warning");
        } else {
          customAlert("", "Server Down", "error");
        }
        // Revert to previous state
        setSwitchStates((prevStates) => ({
          ...prevStates,
          [row.id]: previousStatus,
        }));
      });
  };
  

  //--------------------------------------------------------------------------------
  // Initialize switch states based on initial values
  //--------------------------------------------------------------------------------

  useEffect(() => {
    const initialSwitchStates = {};
    rows.forEach((row) => {
      initialSwitchStates[row.id] = parseInt(row[switchColumnName]) === 1;
    });
    setSwitchStates(initialSwitchStates);
  }, [rows, switchColumnName]);

  //--------------------------------------------------------------------------------
  // Initialize dropdown states based on initial values
  //--------------------------------------------------------------------------------

  useEffect(() => {
    if (!isInitialized.current && rows.length > 0) {
      const initialDropdownStates = {};
      rows.forEach((row) => {
        initialDropdownStates[row.id] = row[dropdownColumnName];
      });
      setDropdownStates(initialDropdownStates);
      isInitialized.current = true; // Mark as initialized
    }
  }, [rows, dropdownColumnName]);

  //--------------------------------------------------------------------------------
  // Handle Dropdown Change
  //--------------------------------------------------------------------------------

  const handleDropdownChange = (event, row) => {
    const newValue = event.target.value;
    const previousStatus = switchStates[row.id]; // Store the previous state
  
    const updatedDropdownStates = {
      ...dropdownStates,
      [row.id]: newValue,
    };
    setDropdownStates(updatedDropdownStates);
  
    const updatedRow = {
      ...row,
      [dropdownColumnName]: newValue,
      [switchColumnName]: switchStates[row.id] ? 1 : 0,
    };
  
    axios
      .put(`${baseURL}/${dropdownUpdateApi}/${row.id}`, updatedRow, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 200) {
          customAlert("", "Updated Successfully", "success");
          SetDataBaseUpdate(true);
        } else {
          customAlert("", "Failed to update", "error");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data.error;
          customAlert("", errorMessage, "warning");
        } else {
          customAlert("", "Server Down", "error");
        }
        // Revert to previous state
        setSwitchStates((prevStates) => ({
          ...prevStates,
          [row.id]: previousStatus,
        }));
      });
  };

  return (
    <>
      {loading && <ProcessProgressCircle RequiredProgressName="Deleting..." />}

      {/* _______________table start___________________ */}
      <div className="outer-wraper-table-body-template ">
        <div className="table-wraper-table-body-template">
          <table>
            {/* ________________table header__________________ */}
            <thead className="headercolumns-table-body-template">
              <th className="headercolumns-table-body-template">
                <Checkbox
                  checked={selectedRowCheckBox.length === rows.length}
                  onChange={handleSelectAll}
                />
              </th>
              {columns.map((column, index) =>
                // Render only if the column field is in visibleColumns and not switchColumnName or dropdownColumnName
                visibleColumns.includes(column.field) &&
                column.field !== switchColumnName &&
                column.field !== dropdownColumnName ? (
                  <th className="headercolumns-table-body-template" key={index}>
                    <div
                      className="headerContent-table-template-body"
                      onClick={() => handleSort(column.field)}
                    >
                      {column.headerName}
                      {sortConfig.key === column.field &&
                      sortConfig.direction === "asc" ? (
                        <Tooltip title={"Sort By Ascending"} arrow>
                          <ArrowUpwardIcon
                            className="arrow-direction-up-table-body-template"
                            id="button-zoom"
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title={"Sort By Descending"} arrow>
                          <ArrowUpwardIcon
                            className="arrow-direction-down-table-body-template"
                            id="button-zoom"
                          />
                        </Tooltip>
                      )}
                    </div>
                  </th>
                ) : null
              )}
              {switchColumnName && (
                <th className="headercolumns-table-body-template">
                  <div
                    className="headerContent-table-template-body"
                    onClick={() => handleSort(switchColumnName)}
                  >
                    {switchColumnName}
                    {sortConfig.key === switchColumnName &&
                    sortConfig.direction === "asc" ? (
                      <Tooltip title={"Sort By Ascending"} arrow>
                        <ArrowUpwardIcon
                          className="arrow-direction-up-table-body-template"
                          id="button-zoom"
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title={"Sort By Descending"} arrow>
                        <ArrowUpwardIcon
                          className="arrow-direction-down-table-body-template"
                          id="button-zoom"
                        />
                      </Tooltip>
                    )}
                  </div>
                </th>
              )}
              {dropdownColumnName && (
                <th className="headercolumns-table-body-template">
                  <div
                    className="headerContent-table-template-body"
                    onClick={() => handleSort(dropdownColumnName)}
                  >
                    {dropdownColumnName}
                    {sortConfig.key === dropdownColumnName &&
                    sortConfig.direction === "asc" ? (
                      <Tooltip title={"Sort By Ascending"} arrow>
                        <ArrowUpwardIcon
                          className="arrow-direction-up-table-body-template"
                          id="button-zoom"
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title={"Sort By Descending"} arrow>
                        <ArrowUpwardIcon
                          className="arrow-direction-down-table-body-template"
                          id="button-zoom"
                        />
                      </Tooltip>
                    )}
                  </div>
                </th>
              )}
              <th className="headercolumns-table-body-template">Actions</th>
            </thead>
            {/* ________________________end________________________ */}
            {/* _________________table body________________________ */}
            {sortedData.length === 0 ? (
              <div className="Data-not-avilable-showing-container-table-body-template">
                No Data available
              </div>
            ) : (
              <tbody>
                {sortedData.map((row) => (
                  <tr
                    key={row.id}
                    className={
                      selectedRowId.includes(row.id) && Boolean(anchorEl)
                        ? "tr-hover-active"
                        : ""
                    }
                  >
                    <td className="tablerows">
                      <Checkbox
                        checked={
                          selectedRowCheckBox.includes(row.id) &&
                          !Boolean(anchorEl)
                        }
                        onChange={(event) => handleRowSelect(event, row.id)}
                      />
                    </td>

                    {columns.map((column, index) =>
                      visibleColumns.includes(column.field) &&
                      column.field !== switchColumnName &&
                      column.field !== dropdownColumnName ? (
                        <td className="tablerows" key={index}>
                        {isURL(row[column.field]) ? (
                          <a
                            href={formatURL(row[column.field])}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {row[column.field]}
                          </a>
                        ) : (
                          row[column.field]
                          // <span  dangerouslySetInnerHTML={{ __html: row[column.field]}} />
                        )}
                      </td>
                      ) : null
                    )}
                    {switchColumnName && (
                      <td className="tablerows">
                        <Switch
                          checked={!!switchStates[row.id]}
                          onChange={(event) => handleSwitchChange(event, row)}
                        />
                      </td>
                    )}
                    {dropdownColumnName && (
                      <td className="tablerows">
                        <Select
                          className="select-dropdown-border-remove"
                          value={dropdownStates[row.id]}
                          onChange={(event) => handleDropdownChange(event, row)}
                        >
                          <MenuItem value="No">No</MenuItem>
                          <MenuItem value="Yes">Yes</MenuItem>
                        </Select>
                      </td>
                    )}
                    {/* ___________________action button funtionallity and list__________ */}
                    <td className="tablerows">
                      <div className="moreiconalign-table-template-body">
                        <IconButton
                          className={`moreiconbutton-background-alignment-table-template-body ${
                            selectedRowId.includes(row.id) && Boolean(anchorEl)
                              ? "active"
                              : ""
                          }`}
                          onClick={(event) => handleClick(event, row.id)}
                        >
                          <MoreVertIcon
                            className="more-icon-color-and-pointer-table-template-body"
                            id="button-zoom"
                          />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={
                            Boolean(anchorEl) && selectedRowId.includes(row.id)
                          }
                          onClose={handleClose}
                        >
                          <DynamicMenuItem
                            icon={EditIcon}
                            label="Edit"
                            onClick={() => handleEdit(row, row.id)}
                          />

                          <DynamicMenuItem
                            icon={DeleteIcon}
                            label="Delete"
                            onClick={() => handleDelete(row.id)}
                            IconColor="red"
                          />
                          {customMenuItems &&
                            customMenuItems.map((item, index) => (
                              <DynamicMenuItem
                                key={index}
                                icon={item.icon}
                                label={item.label}
                                IconColor={item.IconColor}
                                onClick={() => item.onClick(row, row.id)}
                              />
                            ))}
                        </Menu>
                      </div>
                    </td>
                    {/* ________________ends here____________________ */}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
}

export default TableBodyTemplate;
