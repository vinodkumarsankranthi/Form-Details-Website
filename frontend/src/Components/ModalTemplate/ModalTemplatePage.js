import React, { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Switch,
  Tooltip,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import "./modaltemplatepage.css";

const ModalTemplatePage = ({ open, close }) => {
  const [textFieldValue, setTextFieldValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [switchChecked, setSwitchChecked] = useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState("");
  const [options, setOptions] = useState(["Option 1", "Option 2", "Option 3"]);
  const [newOption, setNewOption] = useState("");

  //--------------------------------------------------------------------------------
  // Handle the text field change
  //--------------------------------------------------------------------------------

  const handleTextFieldChange = (event) => {
    setTextFieldValue(event.target.value);
  };

  //--------------------------------------------------------------------------------
  // Handle the dropdown change
  //--------------------------------------------------------------------------------

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };
  //--------------------------------------------------------------------------------
  // Handle the switch status change
  //--------------------------------------------------------------------------------

  const handleSwitchChange = (event) => {
    setSwitchChecked(event.target.checked);
  };
  //--------------------------------------------------------------------------------
  // Handle the autocomplete input change
  //--------------------------------------------------------------------------------

  const handleAutocompleteChange = (event, value) => {
    setAutocompleteValue(value);
  };

  //--------------------------------------------------------------------------------
  // Handle the autocomplete input change when typing
  //--------------------------------------------------------------------------------

  const handleAutocompleteInputChange = (event, value) => {
    setNewOption(value);
  };

  //--------------------------------------------------------------------------------
  // Add new option to the dropdown
  //--------------------------------------------------------------------------------

  const handleAddOption = () => {
    if (newOption && !options.includes(newOption)) {
      setOptions([...options, newOption]);
      setAutocompleteValue(newOption);
    }
  };
  //--------------------------------------------------------------------------------
  // Handle save button click
  //--------------------------------------------------------------------------------

  const handleSave = () => {
    console.log("TextField Value: ", textFieldValue);
    console.log("Dropdown Value: ", dropdownValue);
    console.log("Switch Checked: ", switchChecked);
    console.log("Autocomplete Value: ", autocompleteValue);
    // Add your save logic here
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        className="Modal-screen-center-alignment"
      >
        <div className="modal-container">
          <div className="modal-inside-content-container">
            <IconButton
              id="button-zoom"
              className="modal-close-iconButton-right-top-corner"
              onClick={close}
            >
              <CloseIcon className="modal-close-iconButton-right-top-corner-symbol" />
            </IconButton>
            <div className="modal-header-and-switch-container">
              <h5 className="modal-header-name">Header Name</h5>
              <div className="modal-switch-name">
                Switch:
                <Switch
                  checked={switchChecked}
                  onChange={handleSwitchChange}
                  name="Switch"
                  color="primary"
                  className="modal-switch-alignment"
                />
              </div>
            </div>
            <div className="modal-grid-textfield-dropdown-container">
              <TextField
                required
                label="Text Field"
                variant="outlined"
                fullWidth
                value={textFieldValue}
                onChange={handleTextFieldChange}
              />
              <TextField
                required
                select
                label="Dropdown"
                variant="outlined"
                fullWidth
                value={dropdownValue}
                onChange={handleDropdownChange}
              >
                <MenuItem value="True">True</MenuItem>
                <MenuItem value="False">False</MenuItem>
              </TextField>
              <div className="modal-autocomplete-container">
                <Autocomplete
                  fullWidth
                  disableClearable
                  options={options}
                  value={autocompleteValue}
                  onChange={handleAutocompleteChange}
                  onInputChange={handleAutocompleteInputChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Autocomplete"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {params.InputProps.endAdornment}
                            {newOption && !options.includes(newOption) && (
                              <Tooltip title="Add Option">
                                <div
                                  className="modal-course-name-add-button"
                                  onClick={handleAddOption}
                                >
                                  <AddIcon className="modal-add-additional-option-button" />
                                </div>
                              </Tooltip>
                            )}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </div>
              <div className="Save-Button-Alignment-container">
                <Button
                  id="button-zoom"
                  variant="contained"
                  color="success"
                  onClick={handleSave}
                >
                  <SaveIcon className="buttonicons" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalTemplatePage;
