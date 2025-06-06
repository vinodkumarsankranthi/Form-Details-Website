import React from "react";
import { MenuItem } from "@mui/material";
import './commontemplate.css'

//--------------------------------------------------------------------------------
//To add the Dynamic Menuitems
//--------------------------------------------------------------------------------
function DynamicMenuItem({ icon: Icon, label, onClick, IconColor }) {
  return (
    <MenuItem onClick={onClick}>
      <Icon
        className="buttonicons"
        id={`batchcard${label.toLowerCase()}icon `}
        style={{ color: IconColor || "blue" }}
      />
      &nbsp;&nbsp;
      <span className="menuitemscolor">{label}</span>
    </MenuItem>
  );
}

export default DynamicMenuItem;
