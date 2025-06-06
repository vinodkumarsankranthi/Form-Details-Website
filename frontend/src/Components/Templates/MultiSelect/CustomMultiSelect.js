import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";
import "./CustomMultiSelect.css";

function CustomMultiSelect({
  options = [],
  selectedOption = [],
  setSelectedOption = [],
  label = "",
  placeholder = "Start typing to search...",
  chipClassName = "defaultChipTag",
  chipDeleteClassName = "deleteIcon",
}) {
  const [inputValue, setInputValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [showAddIcon, setShowAddIcon] = useState(false);

  // Ensure options are unique
  const uniqueOptions = Array.from(new Set(options.map(option => option.label)))
    .map(label => options.find(option => option.label === label));

  //---------------------------------------------------------------------------  
  // Handle Input Change & show plus if option NA
  //---------------------------------------------------------------------------  
  const handleInputChange = (newValue) => {
    setInputValue(newValue);

    const notInOptions = !uniqueOptions.some(
      (option) => option.label.toLowerCase() === newValue.toLowerCase()
    );

    setShowAddIcon(newValue.trim() !== "" && notInOptions);
  };

  //---------------------------------------------------------------------------  
  // Plus icon function - For Add new skill
  //---------------------------------------------------------------------------  
  const handleAddNewItem = () => {
    const newItem = { value: typeValue, label: typeValue };
    if (typeValue && !selectedOption.some(option => option.label.toLowerCase() === typeValue.toLowerCase())) {
      setSelectedOption([...selectedOption, newItem]);
    }
    setInputValue("");
    setShowAddIcon(false);
    setTypeValue("");
  };

  // Ensure options and selectedOption are arrays
  const validSelectedOption = Array.isArray(selectedOption) ? selectedOption : [];

  // Filter options to exclude already selected items
  const selectedValues = validSelectedOption.map((option) => option.value);
  const filteredOptions = uniqueOptions.filter(
    (option) => !selectedValues.includes(option.value)
  );

  return (
    <div>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={filteredOptions}
        value={validSelectedOption}
        onChange={(event, newValue) => {
          setSelectedOption(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          handleInputChange(newInputValue);
        }}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              {option.label}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={placeholder}
            label={label}
            onChange={(e) => {
              setTypeValue(e.target.value);
            }}
            InputProps={{
              ...params.InputProps,
              classes: {
                root: "customAutocompleteInput",
                focused: "customAutocompleteInputFocused",
                notchedOutline: "customAutocompleteInputOutline",
              },
              endAdornment: (
                <InputAdornment position="start" className="endAdornmentStyle">
                  <Tooltip title="" placement="top" arrow>
                    {showAddIcon && (
                      <Tooltip title="Add New Skill" placement="top" arrow>
                        <IconButton
                          className={
                            selectedOption.length > 0
                              ? `plsIcon AddPlusContainer`
                              : `plsIcon`
                          }
                          onClick={handleAddNewItem}
                        >
                          <AddIcon className="XKeyContainer-icon" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {selectedOption.length > 0 && !showAddIcon && (
                      <Tooltip title="Clear All" placement="top" arrow>
                        <IconButton
                     
                          className={
                            selectedOption.length > 0
                              ? `XKeyContainer`
                              : `XKeyContainerNull`
                          }
                          onClick={() => setSelectedOption([])}
                        >
                          <CloseIcon className="XKeyContainer-icon" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <span className="chipContainer" key={index}>
              <Chip 
                className="chip-background-color-and-alignment"
                label={option.label}
                {...getTagProps({ index })}
                deleteIcon={
                  <Tooltip title="Remove" placement="top" arrow>
                    <CloseIcon className="chip-background-color-and-alignment-delete" />
                  </Tooltip>
                }
                classes={{
                  root: 'chip-background-color-and-alignment',
                  deleteIcon: 'chip-background-color-and-alignment-delete',
                }}
              />
            </span>
          ))
        }
      />
    </div>
  );
}

export default CustomMultiSelect;
