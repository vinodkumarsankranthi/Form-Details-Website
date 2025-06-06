import React, { useState, useEffect } from "react";
import { TextField, Tooltip } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import styles for the phone input
import { parsePhoneNumberFromString } from "libphonenumber-js"; // Import for validation
import ImageCropperTemplate2 from "../Templates/ImageCroper/ImageCropperTemplate2";
import "./FromCompany.css";
import { Edit, Delete, PhotoCamera } from "@mui/icons-material";
import axios from "axios"; // Import Axios for API calls
import { customAlert } from "../SweetAlertCommon/Custom";
import { baseURL } from "../../http";

const FromCompanyAddProject = ({ setCompanyDetails, CompanyDetails }) => {
  const [profilePictureModalStatus, setProfilePictureModalStatus] =
    useState(false);
  const [croppedLogoURL, setCroppedLogoURL] = useState(null);
  const [croppedSignImageURL, setCroppedSignImageURL] = useState(null);
  const [croppedStampImageURL, setCroppedStampImageURL] = useState(null);
  console.log(croppedLogoURL);
  console.log(croppedSignImageURL);
  console.log(croppedStampImageURL);
  const [imageEditMode, setImgEditMode] = useState(0);
  const [phoneError, setPhoneError] = useState(""); // State for phone error
  const [isHoveredLogo, setIsHoveredLogo] = useState(false);
  const [isHoveredSign, setIsHoveredSign] = useState(false);
  const [isHoveredStamp, setIsHoveredStamp] = useState(false);

  useEffect(() => {
    console.log("Company Details:", CompanyDetails);
  }, [CompanyDetails]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCompanyDetails({
      ...CompanyDetails,
      [e.target.name]: value,
    });
  };

  const handlePhoneChange = (phone, data) => {
    const formattedPhone = `+${data.dialCode} ${phone.slice(
      data.dialCode.length
    )}`;
    const phoneNumber = parsePhoneNumberFromString(formattedPhone);

    if (phoneNumber && phoneNumber.isValid()) {
      setPhoneError(""); // Clear error if valid
      setCompanyDetails({
        ...CompanyDetails,
        phone_number: formattedPhone.trim(),
      });
    } else {
      setPhoneError("Phone Number is Invalid.");
    }
  };

  console.log(profilePictureModalStatus);
  const handleOpenCropper = () => {
    setProfilePictureModalStatus(true);
    setImgEditMode(1); // For logo cropper
  };

  console.log(profilePictureModalStatus);
  const handleOpenSignImageCropper = () => {
    setProfilePictureModalStatus(true);
    setImgEditMode(2); // For sign image cropper
  };

  console.log(profilePictureModalStatus);
  const handleOpenStampImageCropper = () => {
    setProfilePictureModalStatus(true);
    setImgEditMode(3); // For stamp image cropper
  };

  const handleSaveCroppedImage = () => {
    if (croppedLogoURL) {
      setCompanyDetails({ ...CompanyDetails, logo: croppedLogoURL });
      setProfilePictureModalStatus(false);
      setImgEditMode(1);
      setCroppedLogoURL(null); // Reset cropped logo URL
    } else {
      customAlert("No logo selected. Please try again.");
    }
  };

  const handleSaveCroppedSignImage = () => {
    if (croppedSignImageURL) {
      setCompanyDetails({ ...CompanyDetails, sign_image: croppedSignImageURL });
      setProfilePictureModalStatus(false);
      setImgEditMode(2);
      setCroppedSignImageURL(null); // Reset cropped sign image URL
    } else {
      customAlert("No sign image selected. Please try again.");
    }
  };

  const handleSaveCroppedStampImage = () => {
    if (croppedStampImageURL) {
      setCompanyDetails({
        ...CompanyDetails,
        stamp_image: croppedStampImageURL,
      });
      setProfilePictureModalStatus(false);
      setImgEditMode(3);
      setCroppedStampImageURL(null); // Reset cropped stamp image URL
    } else {
      customAlert("No stamp image selected. Please try again.");
    }
  };

  // Delete logo
  const handleDeleteLogo = async () => {
    try {
      const response = await axios.delete(`${baseURL}/company/logo`, {
        data: { companyId: CompanyDetails.id }, // Pass company ID if required
      });
      if (response.status === 200) {
        setCompanyDetails({ ...CompanyDetails, logo: null }); // Clear the logo in state
        console.log("Logo deleted successfully.");
      } else {
        console.log("Failed to delete logo. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting logo:", error);
    }
  };

  // Delete signature image
  const handleDeleteSignImage = async () => {
    try {
      const response = await axios.delete(`${baseURL}/company/sign`, {
        data: { companyId: CompanyDetails.id },
      });
      if (response.status === 200) {
        setCompanyDetails({ ...CompanyDetails, sign_image: null });
        console.log("Signature image deleted successfully.");
      } else {
        console.log("Failed to delete signature image. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting signature image:", error);
    }
  };

  // Delete stamp image
  const handleDeleteStampImage = async () => {
    try {
      const response = await axios.delete(`${baseURL}/company/stamp`, {
        data: { companyId: CompanyDetails.id },
      });
      if (response.status === 200) {
        setCompanyDetails({ ...CompanyDetails, stamp_image: null });
        console.log("Stamp image deleted successfully.");
      } else {
        console.log("Failed to delete stamp image. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting stamp image:", error);
    }
  };

  return (
    <div className="from-company-scroll-container">
      <div className="from-company-modal-content">
        {/* Row 1: a1.name, a2.address, b1.logo */}
        <div className="form-row flex-row">
          <div className="flex-item" style={{ flex: 1 }}>
            <div className="column-layout">
              <TextField
                label="Company Name"
                name="name"
                value={CompanyDetails.name || ""}
                onChange={handleInputChange}
                className="from-company-text-field-container"
                required
              />
              <div className="flex-item from-company-phone-number-container">
                <PhoneInput
                  country={"in"}
                  value={CompanyDetails.phone_number || ""}
                  onChange={handlePhoneChange}
                  inputStyle={{
                    width: "100%",
                    height: "50px",
                    fontSize: "16px",
                  }}
                  containerStyle={{
                    width: "100%",
                  }}
                  required
                />
                {phoneError && (
                  <div
                    style={{
                      color: "red",
                      marginTop: "1px",
                      fontSize: "small",
                    }}
                  >
                    {phoneError}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-item" style={{ flexShrink: 0 }}>
            <div className="from-company-profile-group-from-company-cpLogo">
              <div className="from-company-profile-image-container">
                <div
                  className="image-container-review1"
                  onMouseEnter={() => setIsHoveredLogo(true)}
                  onMouseLeave={() => setIsHoveredLogo(false)}
                >
                  <img
                    src={CompanyDetails.logo || ""}
                    alt=""
                    className="from-company-logo-image"
                  />

                  <div
                    className={`icon-container ${
                      isHoveredLogo ? "visible" : ""
                    }`}
                  >
                    {CompanyDetails.logo ? (
                      <>
                        {/* Edit Icon */}
                        <Tooltip title="Edit Logo" arrow>
                          <label
                            onClick={handleOpenCropper}
                            className="icon-edit-icon"
                          >
                            <Edit />
                          </label>
                        </Tooltip>

                        {/* Delete Icon */}
                        <Tooltip title="Delete Logo" arrow>
                          <label
                            onClick={handleDeleteLogo}
                            className="icon-delete-icon"
                          >
                            <Delete />
                          </label>
                        </Tooltip>
                      </>
                    ) : (
                      // Placeholder icon when there's no logo
                      <Tooltip title="Add Company Logo" arrow>
                        <label
                          onClick={handleOpenCropper}
                          className="icon-add-icon"
                        >
                          <PhotoCamera />
                        </label>
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Phone Number */}
        <div className="form-row flex-row">
          <TextField
            label="Address"
            name="address"
            value={CompanyDetails.address || ""}
            onChange={handleInputChange}
            className="from-company-text-field-container"
            required
          />
        </div>

        {/* Row 4: GST, PAN Number */}
        <div className="form-row flex-row">
          <div className="flex-item">
            <TextField
              label="GST number"
              name="gst"
              value={CompanyDetails.gst || ""}
              onChange={handleInputChange}
              className="from-company-text-field-container"
            />
          </div>
          <div className="flex-item">
            <TextField
              label="PAN Number"
              name="pan_number"
              value={CompanyDetails.pan_number || ""}
              onChange={handleInputChange}
              className="from-company-text-field-container"
            />
          </div>
        </div>

        {/* Row 5: Official Mail ID, Mail ID */}
        <div className="form-row flex-row">
          <div className="flex-item">
            <TextField
              label="Official Mail ID"
              name="official_mail_id"
              type="email"
              fullWidth
              required
              value={CompanyDetails.official_mail_id}
              onChange={handleInputChange}
              className="from-company-text-field-container"
            />
          </div>
          <div className="flex-item">
            <TextField
              label="Mail ID"
              name="mail_id"
              value={CompanyDetails.mail_id || ""}
              onChange={handleInputChange}
              className="from-company-text-field-container"
              required
            />
          </div>
        </div>

        {/* Row 6: Contact Person Name, Designation */}
        <div className="form-row flex-row">
          <div className="flex-item">
            <TextField
              label="Contact Person Name"
              name="contact_person_name"
              value={CompanyDetails.contact_person_name || ""}
              onChange={handleInputChange}
              className="from-company-text-field-container"
              required
            />
          </div>
          <div className="flex-item">
            <TextField
              label="Designation"
              name="designation"
              value={CompanyDetails.designation || ""}
              onChange={handleInputChange}
              className="from-company-text-field-container"
            />
          </div>
        </div>

        {/* Row 7: Bank Name, Bank Branch */}
        <div className="form-row flex-row">
          <div className="flex-item">
            <TextField
              label="Bank Name"
              name="bank_name"
              value={CompanyDetails.bank_name || ""}
              onChange={handleInputChange}
              className="from-company-text-field-container"
            />
          </div>
          <div className="flex-item">
            <TextField
              label="Bank Branch"
              name="bank_branch"
              value={CompanyDetails.bank_branch || ""}
              onChange={handleInputChange}
              className="from-company-text-field-container"
            />
          </div>
        </div>

        {/* Row 8: Bank Account No, Bank IFSC Code */}
        <div className="form-row flex-row">
          <div className="flex-item">
            <TextField
              label="Bank Account No"
              name="bank_account_no"
              value={CompanyDetails.bank_account_no || ""}
              onChange={handleInputChange}
              className="from-company-text-field-container"
            />
          </div>
          <div className="flex-item">
            <TextField
              label="Bank IFSC Code"
              name="bank_ifsc_code"
              value={CompanyDetails.bank_ifsc_code || ""}
              onChange={handleInputChange}
              className="from-company-text-field-container"
            />
          </div>
        </div>

        {/* Row 9: Sign Image, Stamp Image */}
        <div className="form-row flex-row from-company-sign-stamp-row">
          {/* Signature Image */}
          <div className="flex-item">
            <div className="from-company-profile-group-from-company-cpLogo">
              <div className="from-company-profile-image-container">
                <div
                  className="image-container-review1"
                  onMouseEnter={() => setIsHoveredSign(true)}
                  onMouseLeave={() => setIsHoveredSign(false)}
                >
                  <img
                    src={CompanyDetails.sign_image || "default-sign.png"}
                    alt=""
                    className="from-company-logo-image"
                  />

                  <div
                    className={`icon-container ${
                      isHoveredSign ? "visible" : ""
                    }`}
                  >
                    {CompanyDetails.sign_image ? (
                      <>
                        {/* Edit Icon */}
                        <Tooltip title="Edit Signature" arrow>
                          <label
                            onClick={handleOpenSignImageCropper}
                            className="icon-edit-icon"
                          >
                            <Edit />
                          </label>
                        </Tooltip>

                        {/* Delete Icon */}
                        <Tooltip title="Delete Signature" arrow>
                          <label
                            onClick={handleDeleteSignImage}
                            className="icon-delete-icon"
                          >
                            <Delete />
                          </label>
                        </Tooltip>
                      </>
                    ) : (
                      // Placeholder icon when there's no signature
                      <Tooltip title="Add Signature" arrow>
                        <label
                          onClick={handleOpenSignImageCropper}
                          className="icon-add-icon"
                        >
                          <PhotoCamera />
                        </label>
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stamp Image */}
          <div className="flex-item">
            <div className="from-company-profile-group-from-company-cpLogo">
              <div className="from-company-profile-image-container">
                <div
                  className="image-container-review1"
                  onMouseEnter={() => setIsHoveredStamp(true)}
                  onMouseLeave={() => setIsHoveredStamp(false)}
                >
                  <img
                    src={CompanyDetails.stamp_image || "default-stamp.png"}
                    alt=""
                    className="from-company-logo-image"
                  />

                  <div
                    className={`icon-container ${
                      isHoveredStamp ? "visible" : ""
                    }`}
                  >
                    {CompanyDetails.stamp_image ? (
                      <>
                        {/* Edit Icon */}
                        <Tooltip title="Edit Stamp" arrow>
                          <label
                            onClick={handleOpenStampImageCropper}
                            className="icon-edit-icon"
                          >
                            <Edit />
                          </label>
                        </Tooltip>

                        {/* Delete Icon */}
                        <Tooltip title="Delete Stamp" arrow>
                          <label
                            onClick={handleDeleteStampImage}
                            className="icon-delete-icon"
                          >
                            <Delete />
                          </label>
                        </Tooltip>
                      </>
                    ) : (
                      // Placeholder icon when there's no stamp
                      <Tooltip title="Add Stamp" arrow>
                        <label
                          onClick={handleOpenStampImageCropper}
                          className="icon-add-icon"
                        >
                          <PhotoCamera />
                        </label>
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-row flex-row">
          <div className="flex-item">
            <TextField
              label="Website Link"
              name="website_link"
              value={CompanyDetails.website_link}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
        </div>

        {/* Image Cropper Modal */}

        {profilePictureModalStatus && (
          <ImageCropperTemplate2
            open={profilePictureModalStatus}
            setOpen={setProfilePictureModalStatus}
            croppedImageDataUrl={
              imageEditMode === 1
                ? croppedLogoURL
                : imageEditMode === 2
                ? croppedSignImageURL
                : croppedStampImageURL
            }
            setCroppedImageDataUrl={
              imageEditMode === 1
                ? setCroppedLogoURL
                : imageEditMode === 2
                ? setCroppedSignImageURL
                : setCroppedStampImageURL
            }
            handleSave={
              imageEditMode === 1
                ? handleSaveCroppedImage
                : imageEditMode === 2
                ? handleSaveCroppedSignImage
                : handleSaveCroppedStampImage
            }
          />
        )}
      </div>
    </div>
  );
};

export default FromCompanyAddProject;
