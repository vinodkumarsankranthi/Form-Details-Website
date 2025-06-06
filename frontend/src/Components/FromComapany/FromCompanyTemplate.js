import React, { useState } from "react";
import { Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FromCompanyDownloadTemplate from "./FromCompanyDownloadTemplate";
import FromComapnyUploadFromTemplate from "./FromCompanyUploadFromTemplate";
import "./FromCompany.css";

function FromCompanyTemplate({
  open,
  close,
  columns,
  handleAddCompanyClick,
  SetDataBaseUpdate,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle the menu open for the Download Template
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the modal
  const handleModalClose = () => {
    close();
  };

  return (
    <div>
      <Modal open={open} onClose={handleModalClose} className="from-company-template-modal">
        {/* _________________________Header_______________________ */}
        <div className="from-company-template-modal-container">
          <div className="from-company-template-container-with-content">
            <IconButton
              id="button-zoom"
              className="from-company-template-close-button"
              onClick={handleModalClose}
            >
              <CloseIcon className="from-company-template-close-button-x" />
            </IconButton>
            <h5 className="from-company-template-header">Company Management</h5>

            {/* _________________________Button, upload, download, add_______________________ */}
            <div className="from-company-template-model-icon">
            <div className="from-company-template-add-course-icon">
              <div onClick={handleAddCompanyClick}>
                <AddBoxIcon
                  className="from-company-template-addboxixon-style"
                  color="primary"
                  fontSize="large"
                />
                <div>
                  Add
                  <br />
                  Details
                </div>
              </div>
            </div>
             
              {/* _________________________Download Template Button_______________________ */}
              <div className="from-company-template-add-course-icon">
              <div onClick={handleMenuOpen}>
                <FileDownloadIcon
                  className="from-company-template-addboxixon-style"
                  color="primary"
                  fontSize="large"
                />
                <div>
                  Download
                  <br />
                  Template
                </div>
              </div>
              </div>

              {/* Upload Component */}
              <FromComapnyUploadFromTemplate
                DBApi="/from-company-upload"
                update={SetDataBaseUpdate}
                close={handleModalClose}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Download Template Modal */}
      <FromCompanyDownloadTemplate
        columns={columns}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </div>
  );
}

export default FromCompanyTemplate;
