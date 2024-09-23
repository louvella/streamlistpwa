import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserInformation({ onAddEvent }) {
  // State for user data
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: "",
    email: "",
  });

  // State for managing read-only mode
  const [isReadOnly, setIsReadOnly] = useState(true);

  // State to track which fields have been edited
  const [editedFields, setEditedFields] = useState({});

  // Effect to load user data from localStorage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // Handler for input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));

    // Track which fields are being edited
    setEditedFields((prevFields) => ({ ...prevFields, [name]: true }));
  };

  // Handler to toggle read-only mode
  const handleEdit = () => {
    setIsReadOnly(false);
    onAddEvent("Edit mode enabled for user information.");
  };

  // Handler to save data to localStorage and set fields to read-only
  const handleSave = () => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsReadOnly(true);

    // Log which fields were edited
    Object.keys(editedFields).forEach((field) => {
      onAddEvent(`Field '${field}' updated to: ${userData[field]}`);
    });

    onAddEvent("User information saved.");
    setEditedFields({});
  };

  // Handler to cancel editing and reset data to original state
  const handleCancel = () => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData)); // Reset to original data
    }
    setIsReadOnly(true); // Set fields to read-only
    onAddEvent("Editing cancelled.");
    setEditedFields({});
  };

  // Handler to delete user data from localStorage and reset form fields
  const handleDelete = () => {
    localStorage.removeItem("userData");
    setUserData({
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phoneNumber: "",
      email: "",
    });
    // Resets the fields to read-only mode when the readonly condition below is met
    setIsReadOnly(true); 
    onAddEvent("User information deleted.");
  };

  return (
    <div className="streamlist-home-container">
      <nav className="submenu">
        <ul>
          <li><Link to="/user/information">Information</Link></li>
          <li><Link to="/user/password">Password</Link></li>
          <li><Link to="/user/payment">Payment</Link></li>
          <li><Link to="/user/subscription">Subscription</Link></li>
        </ul>
      </nav>
      <h1>Modify Member Contact Information</h1>
      <form className="user-info-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            readOnly={isReadOnly}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            readOnly={isReadOnly}
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={userData.city}
            onChange={handleInputChange}
            readOnly={isReadOnly}
          />
        </div>
        <div className="form-group">
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={userData.state}
            onChange={handleInputChange}
            readOnly={isReadOnly}
          />
        </div>
        <div className="form-group">
          <label>Zip:</label>
          <input
            type="text"
            name="zip"
            value={userData.zip}
            onChange={handleInputChange}
            readOnly={isReadOnly}
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleInputChange}
            readOnly={isReadOnly}
          />
        </div>
        <div className="form-group">
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            readOnly={isReadOnly}
          />
        </div>
        {/* Show Edit button when its in read-only mode or show Save, Cancel, and Delete buttons */}
        {isReadOnly ? (
          <button type="button" onClick={handleEdit}>
            Edit
          </button>
        ) : (
          <>
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default UserInformation;
