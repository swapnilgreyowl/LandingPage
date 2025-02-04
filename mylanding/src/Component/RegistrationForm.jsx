import React, { useState } from "react";
import "../styles/register.css";

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    cardId: generateCardId(),
    emailId: "",
    addressOne: "",
    pincode: "",
    city: "",
    dob: "",
    userPhoto: null,
    brandName: "",
  });

  const [showPreview, setShowPreview] = useState(false);

  const ldate = new Date();
  const formattedDate = ldate.toISOString().slice(0, 10);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      userPhoto: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for phone number and pincode
    const phoneNumberRegex = /^\d{10}$/;
    const pincodeRegex = /^\d{6}$/;

    if (!phoneNumberRegex.test(formData.phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!pincodeRegex.test(formData.pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    setShowPreview(true);
  };

  const handleConfirmAndSave = () => {
    // Save formData to localStorage
    localStorage.setItem("registrationData", JSON.stringify(formData));
    // Clear form data or perform any additional action if needed
    setFormData({
      userName: "",
      phoneNumber: "",
      cardId: generateCardId(),
      addressOne: "",
      emailId: "",
      pincode: "",
      city: "",
      dob: "",
      userPhoto: null,
      brandName: "",
    });
    setShowPreview(false);
    alert("Data Saved");
  };

  // Function to generate a random 9-digit card ID
  function generateCardId() {
    return Math.floor(100000000 + Math.random() * 900000000);
  }

  return (
    <div className="registration-form">
      <div className="header">
        <img src="01Stree.png" width="280px" alt="" />
      </div>
      <h3>Registration Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cardId">Card ID:</label>
          <input
            type="text"
            id="cardId"
            name="cardId"
            value={formData.cardId}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailId">Email ID:</label>
          <input
            type="text"
            id="emailId"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressOne">Address Line 1:</label>
          <input
            type="text"
            id="addressOne"
            name="addressOne"
            value={formData.addressOne}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="upload" htmlFor="userPhoto">
            Upload User Photo +
          </label>
          <input
            type="file"
            id="userPhoto"
            name="userPhoto"
            onChange={handlePhotoChange}
            accept="image/*"
            style={{ display: 'none' }}
            required
          />
          {formData.userPhoto ? (
            <img
              src={URL.createObjectURL(formData.userPhoto)}
              alt="User"
              className="user-photo"
            />
          ) : (
            <label id="uploadimg" className="upload" htmlFor="userPhoto">
              <img
                src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
                alt="Default User"
                className="user-photo"
              />
            </label>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="brandName">Brand Name:</label>
          <select
            id="brandName"
            name="brandName"
            value={formData.brandName}
            onChange={handleChange}
            required
          >
            <option value="">Select Brand</option>
            <option value="Myntra">Myntra</option>
          </select>
        </div>

        <button type="submit">Submit & Preview</button>
      </form>

      {/* Preview section */}
      {showPreview && (
        <div className="preview-section">
          <h3>Preview</h3>
          <div className="card">
            <div className="card-content">
              <div className="fdiv">
                <img
                  style={{ width: "230px", marginBottom: "-20px" }}
                  src="StreeLogo.png"
                  alt="Stree Logo"
                />
                <h4>{formData.userName}</h4>
                <p style={{ marginTop: '-20px' }}>Member From: {formattedDate}</p>
                <img
                  style={{ width: "70px" }}
                  src="https://www.hellotech.com/guide/wp-content/uploads/2020/05/HelloTech-qr-code.jpg"
                  alt="qr"
                />
                <p style={{ fontWeight: "bold", marginTop: "-10px" }}>
                  {formData.cardId}
                </p>
              </div>
              <div>
                <img
                  style={{ width: "70px", marginLeft: "10px" }}
                  src="https://rukminim2.flixcart.com/image/850/1000/xif0q/digital-voucher-code/t/i/s/-original-imagn3acm5rja4bw.jpeg?q=90&crop=false"
                  alt="Stree Logo"
                />
                {formData.userPhoto && (
                  <img
                    src={URL.createObjectURL(formData.userPhoto)}
                    alt="User"
                    className="user-photo"
                  />
                )}
              </div>
            </div>
          </div>
          <br />
          <button onClick={handleConfirmAndSave}>Confirm & Save</button>
        </div>
      )}
    </div>
  );
};


