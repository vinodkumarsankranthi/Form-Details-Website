import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FormDetails.css";

function FormDetails({ onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    address: "",
    profilePhoto: null,
    resume: null,
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    const isFormValid =
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.mobileNumber &&
      formData.address &&
      formData.profilePhoto &&
      formData.resume;
    setIsSubmitDisabled(!isFormValid);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("mobileNumber", formData.mobileNumber);
    data.append("address", formData.address);
    if (formData.profilePhoto) data.append("profilePhoto", formData.profilePhoto);
    if (formData.resume) data.append("resume", formData.resume);

    try {
      const response = await axios.post("http://localhost:8000/api/form-submit1", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Form submitted successfully!");
      console.log("Submitted Data: ", response.data);
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="form-outer-container">
      <div className="form-main1-container">
        <div className="form-header">
          <h1 className="form-title">Create Form Details</h1>
        </div>
        <div className="form-main-container">
          <form className="form" onSubmit={handleSubmit}>
          <div className="scronew_bar">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your last name"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your mobile number"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Enter your address"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Profile Photo</label>
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handleFileChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Resume</label>
              <input
                type="file"
                name="resume"
                accept=".pdf, .doc, .docx"
                onChange={handleFileChange}
                className="form-input"
              />
            </div>
            </div>
            <div className="submit_actions">
            <button
              type="submit"
              className={`form-submit ${isSubmitDisabled ? "form-submit-disabled" : ""}`}
              disabled={isSubmitDisabled}>
              Submit
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormDetails;
