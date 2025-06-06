import React, { useState } from "react";
import ModalTemplatePage from "./ModalTemplatePage";
import { Button } from "@mui/material";

function ModalTemplateSampleCall() {
  const [open, setOpen] = useState(false);

  //--------------------------------------------------------------------------------
  // Open the Modal
  //--------------------------------------------------------------------------------

  const handleOpen = () => {
    setOpen(true);
  };

  //--------------------------------------------------------------------------------
  // Close the Modal
  //--------------------------------------------------------------------------------
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="contained" color="success" onClick={handleOpen}>
        OpenModalTemplate
      </Button>

      {/* _________________call the template modal________________ */}
      <ModalTemplatePage open={open} close={handleClose} />
      {/* __________________________end___________________________ */}
    </div>
  );
}

export default ModalTemplateSampleCall;
