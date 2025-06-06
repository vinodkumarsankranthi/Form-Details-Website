import React, { useState } from "react";
import './mainfile.css';
import FormManager from '../vinodproject/FormManager'; // Import the FormManager component
import FormDetails from "../vinodproject/FormDetails"; // Assuming you have a form creation component

const Mainfile = () => {
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [showFormDetails, setShowFormDetails] = useState(false); // State to toggle FormManager modal visibility

  const handleCreateFormClick = () => {
    setShowForm(true); // Show the form when the button is clicked
    setShowFormDetails(false); // Hide FormManager when creating a new form
  };

  const handleFormDetailsClick = () => {
    setShowFormDetails(true); // Show FormManager when "Form Details" is clicked
    setShowForm(false); // Hide the form
  };

  const handleCloseForm = () => {
    setShowForm(false); // Hide the form when the close button is clicked
    setShowFormDetails(false); // Hide FormManager modal if form is closed
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <h1>Form Management</h1>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {!showForm && !showFormDetails ? (
          <>
            <button className="big-button" onClick={handleCreateFormClick}>
              Create Form
            </button>
            <button className="big-button" onClick={handleFormDetailsClick}>
              Form Details
            </button>
          </>
        ) : (
          <>
              {showForm && (
              <div className="modal-overlay">
                <div className="modal-container">
                  <button className="close-modal-btn" onClick={handleCloseForm}>X</button>
                  <FormDetails />
                </div>
              </div>
            )}
            {showFormDetails && (
              <div className="modal-overlay">
                <div className="modal-container">
                  <button className="close-modal-btn" onClick={handleCloseForm}>X</button>
                  <FormManager />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Form Management System</p>
      </footer>
    </div>
  );
};

export default Mainfile;
