import React, { useState } from "react";
import { BsLinkedin, BsInstagram, BsGithub } from "react-icons/bs";

import "./Footer.css";

export const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setLoading(true);
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://skpgroupofinstitutions.in/mainfile/send_email.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // or "multipart/form-data" if needed
          },
          body: new URLSearchParams(formData).toString(),
        }
      );

      if (response.ok) {
        setLoading(false);
        setIsFormSubmitted(true);
      } else {
        console.error("Failed to send email");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error sending email", error);
      setLoading(false);
    }
    try {
      setLoading(false);
      setIsFormSubmitted(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          alignItems: "center",
          margin: "0",
          backgroundColor: "#f2f5fa", // Background color
          height: "800px", // Assuming you want it to take the full height of the viewport
          display: "flex", // Flex container to center vertically
          flexDirection: "column", // Align children vertically
          justifyContent: "center", // Center content vertically
        }}
      >
        <h2 className="head-text">Take a coffee & chat with me</h2>
        <div className="app__footer-cards">
          <div className="app__footer-card">
            <img src="./images/email.png" alt="email" />
            <a href="mailto:ayushsaha111@gmail.com" className="p-text">
              tspsparasuram@gmail.com
            </a>
          </div>
          <div className="app__footer-card">
            <img src="./images/mobile.png" alt="mobile" />
            <a href="tel: +91 6387607285" className="p-text">
              +91 7603805116
            </a>
          </div>
        </div>

        <div className="app__footer-social">
          <a href="https://www.linkedin.com/in/parasu-ram/" target="__blank">
            <BsLinkedin />
          </a>
          <a href="https://github.com/ramtsps" target="__blank">
            <BsGithub />
          </a>
          <a href="https://www.instagram.com/parasu_.ram/" target="__blank">
            <BsInstagram />
          </a>
        </div>

        {!isFormSubmitted ? (
          <div className="app__footer-form app__flex">
            <div className="app__flex">
              <input
                className="p-text"
                type="text"
                placeholder="Your Name"
                name="name"
                value={name}
                onChange={handleChangeInput}
              />
            </div>
            <div className="app__flex">
              <input
                className="p-text"
                type="email"
                placeholder="Your Email"
                name="email"
                value={email}
                onChange={handleChangeInput}
              />
            </div>
            <div>
              <textarea
                className="p-text"
                placeholder="Your Message"
                value={message}
                name="message"
                onChange={handleChangeInput}
              />
            </div>
            <button type="button" className="p-text" onClick={handleSubmit}>
              {!loading ? "Send Message" : "Sending..."}
            </button>
          </div>
        ) : (
          <div>
            <h3 className="head-text">Thank you for getting in touch!</h3>
          </div>
        )}
      </div>
      <div className="copyfooter">
        <div>
          <p className="p-text">@2024 Parasuram All rights reserved</p>
        </div>
        <div className="social">
          <a href="https://www.linkedin.com/in/parasu-ram/" target="__blank">
            <BsLinkedin />
          </a>
          <a href="https://github.com/ramtsps" target="__blank">
            <BsGithub />
          </a>
          <a href="https://www.instagram.com/parasu_.ram/" target="__blank">
            <BsInstagram />
          </a>
        </div>
      </div>
    </>
  );
};
