import React, { useEffect, useState } from "react";
import PhoneIcon from "../../assets/icons/phone-icon.svg?react";
import LocationIcon from "../../assets/icons/location-icon.svg?react";
import MailIcon from "../../assets/icons/mail-icon.svg?react";
import SocialIcon from "../../assets/icons/social-icon.svg?react";
import FacebookLogo from "../../assets/socials/facebook-logo.svg?react";
import LinkedinLogo from "../../assets/socials/linkedin-logo.svg?react";

import "./Contact.css";
import { Link } from "react-router";
import SendMessage from "./SendMessage";

const Contact = () => {
  const [data, setData] = useState();
  const [socialData, setSocialData] = useState();

  const contactList = {
    phone: PhoneIcon,
    email: MailIcon,
    location: LocationIcon,
  };

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_SHEET_LINK}/Contact`
      );
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSocialData = async () => {
    try {
      const res = await fetch(
        "https://opensheet.elk.sh/1bdpS6h3mNhXXaL47x8PBMK7bwrxH0DLz_TLh3IGz8-0/Social"
      );
      const data = await res.json();
      setSocialData(data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchSocialData();
  }, []);

  return (
    <div id="contact" className="page__container">
      <div className="page-experience">
        <div className="skill-page-content">
          <h1>Contact Me</h1>
          <div className="contact-cards__container">
            <div className="contact-card__container">
              {data &&
                data.map((item) => (
                  <div key={item.Name} className="contact-item">
                    <div className="contact-logo__container">
                      {contactList[item.Name] &&
                        React.createElement(contactList[item.Name], {
                          className: "contact-icon",
                        })}
                    </div>
                    {item.Name === "phone" ? (
                      <Link
                        to={`tel:${item.Detail.replace(/[|\s]/g, "")}`}
                        className="no-style-link"
                      >
                        {item.Detail.replace(/[|\s]/g, "")}
                      </Link>
                    ) : (
                      <span>{item.Detail}</span>
                    )}
                  </div>
                ))}
              {socialData && (
                <div className="contact-item">
                  <div className="contact-logo__container">
                    <SocialIcon className="contact-icon" />
                  </div>
                  <div className="contact-links__container">
                    {Object.entries(socialData).map(([name, link]) => (
                      <Link key={name} to={link} target="_blank">
                        <span className="contant-link-text">{name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="contact-card__container center">
              <SendMessage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
