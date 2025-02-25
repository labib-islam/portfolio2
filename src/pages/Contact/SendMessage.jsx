import React, { useState } from "react";
import ErrorIcon from "../../assets/icons/error-icon.svg?react";

const SendMessage = () => {
  const [inputs, setInputs] = useState({
    Name: "",
    Email: "",
    Message: "",
  });

  const [error, setError] = useState({});

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("not passed");

    setError({});

    let errors = {};

    if (!inputs.Name) errors = { ...errors, Name: "Enter Name" };
    if (!isValidEmail(inputs.Email))
      errors = { ...errors, Email: "Enter Valid Email" };
    if (!inputs.Message) errors = { ...errors, Message: "Enter Message" };

    if (Object.keys(errors).length > 0) {
      // Check if there are errors
      // alert(JSON.stringify(errors, null, 2)); // Convert object to string for alert
      setError(errors);
      return;
    }
    console.log("passed");

    try {
      const now = new Date();
      const bangladeshTime = now.toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // 24-hour format
      });
      const formData = new URLSearchParams();
      formData.append("Name", inputs.Name);
      formData.append("Email", inputs.Email);
      formData.append("Message", inputs.Message);
      formData.append("Date", bangladeshTime);

      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_MESSAGE_SHEET_LINK}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );
      const data = await res.text();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="send-message__form">
      <div className="input__container">
        <input
          className={error.Name ? "error-box" : ""}
          type="text"
          placeholder="Name"
          name="Name"
          onChange={handleChange}
        />
        <div
          className={`error__container ${error.Name ? "active" : "inactive"}`}
        >
          <div className="error-icon__container">
            <ErrorIcon className="error-icon" />
          </div>
          <span>{error.Name && error.Name}</span>
        </div>
      </div>
      <div className="input__container">
        <input
          className={error.Email ? "error-box" : ""}
          type="email"
          placeholder="Email"
          name="Email"
          onChange={handleChange}
        />
        <div
          className={`error__container ${error.Email ? "active" : "inactive"}`}
        >
          <div className="error-icon__container">
            <ErrorIcon className="error-icon" />
          </div>
          <span>{error.Email && error.Email}</span>
        </div>
      </div>
      <div className="input__container text-area">
        <textarea
          className={error.Message ? "error-box" : ""}
          id=""
          rows={5}
          placeholder="Message"
          name="Message"
          onChange={handleChange}
        />
        <div
          className={`error__container  ${
            error.Message ? "active" : "inactive"
          }`}
        >
          <div className="error-icon__container">
            <ErrorIcon className="error-icon" />
          </div>
          <span>{error.Message && error.Message}</span>
        </div>
      </div>

      <button onClick={handleSubmit}>Send A Message</button>
    </form>
  );
};

export default SendMessage;
