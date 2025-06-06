import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormManager.css';

function FormManager() {
    const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [editFormData, setEditFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        address: '',
        profilePhoto: null,
        resume: null,
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/form-data');
            setForms(response.data.data);
        } catch (error) {
            console.error('Error fetching form data:', error);
        }
    };

    const handleEdit = (form) => {
        setSelectedForm(form.id);
        setEditFormData({
            firstName: form.first_name,
            lastName: form.last_name,
            email: form.email,
            mobileNumber: form.mobile_number,
            address: form.address,
            profilePhoto: form.profile_photo,
            resume: form.resume,
        });
        setIsEditModalOpen(true);
    };

    const handleView = (form) => {
        setSelectedForm(form);
        setIsViewModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('firstName', editFormData.firstName);
        data.append('lastName', editFormData.lastName);
        data.append('email', editFormData.email);
        data.append('mobileNumber', editFormData.mobileNumber);
        data.append('address', editFormData.address);
        if (editFormData.profilePhoto && typeof editFormData.profilePhoto !== 'string') {
            data.append('profilePhoto', editFormData.profilePhoto);
        }
        if (editFormData.resume && typeof editFormData.resume !== 'string') {
            data.append('resume', editFormData.resume);
        }

        try {
            const response = await axios.post(`http://localhost:8000/api/form-update/${selectedForm}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert(response.data.message);
            fetchForms();
            setIsEditModalOpen(false);
            setSelectedForm(null);
        } catch (error) {
            console.error('Error updating form:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this form?')) {
            try {
                await axios.delete(`http://localhost:8000/api/form-delete/${id}`);
                alert('Form deleted successfully!');
                fetchForms();
            } catch (error) {
                console.error('Error deleting form:', error);
            }
        }
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const closeViewModal = () => {
        setIsViewModalOpen(false);
    };

    return (
        <div>
            <h2 className="FormManager-heading">Manage Form Details</h2>
            <div className="FormManager-list">
                {forms.map((form) => (
                    <div key={form.id} className="FormManager-item">
                        <h3>{form.first_name} {form.last_name}</h3>
                        <button className="FormManager-edit-btn" onClick={() => handleEdit(form)}>Edit</button>
                        <button className="FormManager-view-btn" onClick={() => handleView(form)}>View</button>
                        <button className="FormManager-delete-btn" onClick={() => handleDelete(form.id)}>Delete</button>
                    </div>
                ))}
            </div>

            {isEditModalOpen && (
                <div className="FormManager-modal">
                    <div className="FormManager-modal-content">
                        <div className="FormManager-modal-header">
                            <h2>Edit Form</h2>
                            <button className="FormManager-modal-close-btn" onClick={closeEditModal}>X</button>
                        </div>
                        <form onSubmit={handleUpdate} className="FormManager-form">
                        <div className='scronew_bar'>
                            <div className="FormManager-input">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    value={editFormData.firstName}
                                    onChange={(e) => setEditFormData({ ...editFormData, firstName: e.target.value })}
                                />
                            </div>
                            <div className="FormManager-input">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    value={editFormData.lastName}
                                    onChange={(e) => setEditFormData({ ...editFormData, lastName: e.target.value })}
                                />
                            </div>
                            <div className="FormManager-input">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={editFormData.email}
                                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                                />
                            </div>
                            <div className="FormManager-input">
                                <label>Mobile Number</label>
                                <input
                                    type="tel"
                                    value={editFormData.mobileNumber}
                                    onChange={(e) => setEditFormData({ ...editFormData, mobileNumber: e.target.value })}
                                />
                            </div>
                            <div className="FormManager-input">
                                <label>Address</label>
                                <textarea
                                    value={editFormData.address}
                                    onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                                />
                            </div>
                            <div className="FormManager-input">
                                <label>Profile Photo</label>
                                <div className="FormManager-file-wrapper">
                                   
                                    <input 
                                        type="file"
                                        onChange={(e) =>
                                            setEditFormData({
                                                ...editFormData,
                                                profilePhoto: e.target.files[0],
                                            })
                                        }
                                    />
                                    {editFormData.profilePhoto && typeof editFormData.profilePhoto === 'string' ? (
                                     <p>Current File: {editFormData.profilePhoto.split('/').pop()}</p>) : null}
                                </div>
                            </div>
                            <div className="FormManager-input">
                                <label>Resume</label>
                                <div className="FormManager-file-wrapper">
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            setEditFormData({
                                                ...editFormData,
                                                resume: e.target.files[0],
                                            })
                                        }
                                    />
                                     {editFormData.resume && typeof editFormData.resume === 'string' ? (
                                    <p>Current File: {editFormData.resume.split('/').pop()}</p>) : null}
                                </div>
                            </div>
                            </div>
                            <button className="FormManager-submit-btn" type="submit">Update</button>
                        </form>
                    </div>
                </div>
            )}

            {isViewModalOpen && selectedForm && (
                <div className="FormManager-modal">
                    <div className="FormManager-modal-content">
                        <div className="FormManager-modal-header">
                            <h2>View Form Details</h2>
                            <button className="FormManager-modal-close-btn" onClick={closeViewModal}>X</button>
                        </div>
                        <div className="FormManager-details">
                            <p><strong>First Name:</strong> {selectedForm.first_name}</p>
                            <p><strong>Last Name:</strong> {selectedForm.last_name}</p>
                            <p><strong>Email:</strong> {selectedForm.email}</p>
                            <p><strong>Mobile Number:</strong> {selectedForm.mobile_number}</p>
                            <p><strong>Address:</strong> {selectedForm.address}</p>
                            <p><strong>Profile Photo:</strong> 
                            <br></br>
                                {selectedForm.profile_photo ? (
                                    <img src={`http://localhost:8000/storage/${selectedForm.profile_photo}`} alt="Profile" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                                ) : "No photo available"}
                            </p>
                            <p><strong>Resume:</strong> 
                                {selectedForm.resume ? (
                                    <a href={`http://localhost:8000/storage/${selectedForm.resume}`} target="_blank" rel="noopener noreferrer">View Resume</a>
                                ) : "No resume available"}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FormManager;
