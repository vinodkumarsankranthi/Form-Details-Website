import React, { useState, useEffect } from "react";
import TableHeaderTemplate from "../GeneralTemplateComponent/TableHeaderTemplate";
import { customAlert } from "../SweetAlertCommon/Custom";
import { Button, Modal,IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { baseURL } from "../../http";
import axios from "axios";
import FromCompanyAddProject from "./FromCompanyAddProject";
import FromCompanyTemplate from "./FromCompanyTemplate";
import "./FromCompany.css";
import VisibilityIcon from "@mui/icons-material/Visibility";


function FromCompanyMain() {
  const [renderColumns, setRenderColumns] = useState([]);
  const [renderRows, setRenderRows] = useState([]);
  const [dataBaseUpdate, setDataBaseUpdate] = useState(false);
  const LoginEmail = localStorage.getItem("HTES_user_id");
  const [openManageCompany, setManageCompany] = useState(false);
  const [showCreateCompany, setShowCreateCompany] = useState(false);
  const [CompanyDetails, setCompanyDetails] = useState({
    name: "",
    address: "",
    gst: "",
    pan_number: "",
    logo: null,
    official_mail_id: "",
    phone_number: "",
    mail_id: "",
    contact_person_name: "",
    designation: "",
    bank_name: "",
    bank_branch: "",
    bank_account_no: "",
    bank_ifsc_code: "",
    sign_image: null,
    stamp_image: null,
    website_link: "", // New field
  });
  // Modal state
  const [Open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  // Fetch company details from the database on component mount
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`${baseURL}/from-companies-index`);
        const data = response.data;

        const columnNames = Object.keys(data[0] || {});
        const columns = columnNames.map((columnName) => ({
          field: columnName,
          headerName: columnName,
        }));

        setRenderColumns(columns);
        const rows = data.map((row, index) => ({
          id: index + 1,
          ...row,
          // website_link: (
          //   <a href={row.website_link} target="_blank" rel="noopener noreferrer">
          //     {row.website_link}
          //   </a>
          // ),
          //
        }));
        
        setRenderRows(rows);
        setDataBaseUpdate(false);
      } catch (error) {
        console.error("Error Fetching Data:", error);
      }
    };

    fetchCompany();
  }, [dataBaseUpdate]);

  const handleAddMoreFunctionality = () => {
    if (LoginEmail) {
      setManageCompany(true);
    } else {
      customAlert("", "Please Login To Add Our Company Details", "warning");
    }
  };

  const handleManageCompanyClose = () => {
    setManageCompany(false);
    setShowCreateCompany(false);
    resetForm();
  };

  const handleAddCompanyClick = () => {
    setShowCreateCompany(true);
    setManageCompany(false);
  };

  const handleSubmit = async () => {
    // Check if all required fields are filled
    const requiredFields = [
      "name",
      "address",
      "phone_number",
      "contact_person_name",
      "official_mail_id",
      "mail_id",
    ];

    const isFormValid = requiredFields.every(
      (field) => CompanyDetails[field] && CompanyDetails[field].trim() !== ""
    );

    if (!isFormValid) {
      customAlert("", "Please fill all the required fields.", "warning");
      return;
    }

    // Add userId for created_by and modified_by
    const userId = localStorage.getItem("HTES_user_id");
    const dataToSubmit = {
      ...CompanyDetails,
      created_by: userId,
      modified_by: userId,
    };

    try {
      const response = await axios.post(
        `${baseURL}/from-company-store`,
        dataToSubmit
      );

      if (response.status === 200 || response.status === 201) {
        customAlert("", "Our Company details created successfully!", "success");
        setDataBaseUpdate(true);
        resetForm();
        handleManageCompanyClose();
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          customAlert("", "A Company with this name already exists.", "warning");
        } else {
          customAlert("", "Failed to save the Company details.", "error");
        }
      } else {
        // Handle network or other unexpected errors
        customAlert("", "Failed to save the Company details. Please try again.", "error");
        console.error("Error creating Company details:", error);
      }
    }
  };

  const handleUpdate = async () => {
    // Add userId for modified_by
    const userId = localStorage.getItem("HTES_user_id");
    const dataToSubmit = {
      ...CompanyDetails,
      logo: CompanyDetails.logo || null,
      sign_image: CompanyDetails.sign_image || null,
      stamp_image: CompanyDetails.stamp_image || null,
      modified_by: userId,
    };

    try {
      const response = await axios.put(
        `${baseURL}/from-company-update/${CompanyDetails.id}`,
        dataToSubmit
      );

      if (response.status === 200) {
        customAlert("", "Our Company details updated successfully!", "success");
        setDataBaseUpdate(true);
        resetForm();
        handleManageCompanyClose();
      }
    }
    catch (error) {
      customAlert(
        "",
        "Failed to update the Company details.",
        "error"
      );
      console.error(error);
    }
  };

  const resetForm = () => {
    setCompanyDetails({
      name: "",
      address: "",
      gst: "",
      pan_number: "",
      logo: null,
      official_mail_id: "",
      phone_number: "",
      mail_id: "",
      contact_person_name: "",
      designation: "",
      bank_name: "",
      bank_branch: "",
      bank_account_no: "",
      bank_ifsc_code: "",
      sign_image: null,
      stamp_image: null,
      website_link: "", // New field
    });
  };

  const handleEdit = (row) => {
    setCompanyDetails({
      id: row.id,
      name: row.name || "",
      address: row.address || "",
      gst: row.gst || "",
      pan_number: row.pan_number || "",
      logo: row.logo || null,
      official_mail_id: row.official_mail_id || "",
      phone_number: row.phone_number || "",
      mail_id: row.mail_id || "",
      contact_person_name: row.contact_person_name || "",
      designation: row.designation || "",
      bank_name: row.bank_name || "",
      bank_branch: row.bank_branch || "",
      bank_account_no: row.bank_account_no || "",
      bank_ifsc_code: row.bank_ifsc_code || "",
      sign_image: row.sign_image || null,
      stamp_image: row.stamp_image || null,
      website_link: row.website_link || "", // New field
    });

    setShowCreateCompany(true);
  };

  /*------------------------------------------------------new------------------------------------------ */
  // Image Modal open function
  const open = (url) => {
    setImageUrl(url);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setImageUrl("");
  };

  const handlelogo = (row) => {
    if (row.logo) {
      open(row.logo); // Open the logo image in the modal
    } else {
      customAlert("", "Logo not available", "warning");
    }
  };

  const handlesign = (row) => {
    if (row.sign_image) {
      open(row.sign_image); // Open the sign image in the modal
    } else {
      customAlert("", "Sign image not available", "warning");
    }
  };

  const handlestamp = (row) => {
    if (row.stamp_image) {
      open(row.stamp_image); // Open the stamp image in the modal
    } else {
      customAlert("", "Stamp image not available", "warning");
    }
  };

  const customMenuItems = [
    {
      icon: VisibilityIcon,
      label: "View Logo",
      onClick: handlelogo,
      IconColor: "green",
    },
    {
      icon: VisibilityIcon,
      label: "View Sign",
      onClick: handlesign,
      IconColor: "red",
    },
    {
      icon: VisibilityIcon,
      label: "View Stamp",
      onClick: handlestamp,
      IconColor: "blue",
    },
  ];

  return (
    <div>
      {!showCreateCompany ? (
        <>
          <TableHeaderTemplate
            columns={renderColumns}
            rows={renderRows}
            handleEdit={handleEdit}
            customMenuItems={customMenuItems}
            is_Manage_Button_Required={true}
            handleManageButtonClick={handleAddMoreFunctionality}
            deleteApi="from-company-destroy"
            Manage_button_name="Manage Our Company"
            SetDataBaseUpdate={setDataBaseUpdate}
            switchColumnName="is_approved"
            swithcUpdateApi="from-company-update"
            DefaultColumnNames={["name", "address", "phone_number"]}
            tableNameForExport="from_company"
            dropdownUpdateApi="from-company-update"
          />
          <FromCompanyTemplate
            open={openManageCompany}
            close={handleManageCompanyClose}
            handleAddCompanyClick={handleAddCompanyClick}
          />
        </>
      ) : (
        <div className="from-company-creat-Company0-container">
          <div className="from-company-Company0-header-buttons">
            <Button
              variant="contained"
              color="success"
              id="from-company-button-zoom"
              onClick={handleManageCompanyClose}
            >
              <ArrowBackIosIcon className="buttonicons-vin" />
              Back
            </Button>
            <h4>
              {CompanyDetails.id ? "Edit Details" : "Our Company Details"}
            </h4>

            {CompanyDetails.id ? (
              <Button
                variant="contained"
                color="success"
                id="from-company-button-zoom"
                onClick={handleUpdate}
              >
                <SaveIcon className="buttonicons-vin" />
                Update
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                id="from-company-button-zoom"
                onClick={handleSubmit}
              >
                <SaveIcon className="buttonicons-vin" />
                Save
              </Button>
            )}
            <hr />
          </div>
          <FromCompanyAddProject
            setCompanyDetails={setCompanyDetails}
            CompanyDetails={CompanyDetails}
          />
        </div>
      )}
      <Modal
      open={Open}onClose={close} className="template-modal"
      >
        <div className="template-modal-container">
          <div className="template-container-with-content">
            <IconButton
              id="button-zoom"
              className="template-close-button"
              onClick={close}
            >
              <CloseIcon className="template-close-button-x" />
            </IconButton>
            <div className="template-model-icon">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Modal Content"
                className="modal-image"
              />
            ) : (
              <p>No image available</p>
            )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default FromCompanyMain;
