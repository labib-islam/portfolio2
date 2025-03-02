import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import DownArrow from "../assets/icons/down-arrow-01-01.svg?react";

import "./Layout.css";

const Layout = () => {
  const navLinks = [
    { name: "About Me", path: "aboutme" },
    { name: "Experience", path: "experience" },
    { name: "Projects", path: "projects" },
    { name: "Skills", path: "skills" },
    { name: "Education", path: "education" },
    { name: "Contact", path: "contact" },
  ];

  const [dropdownStatus, setDropdownStatus] = useState("inactive");

  const dropdownRef = useRef();

  const dropdownStatusHandler = (event) => {
    event.stopPropagation();
    dropdownStatus === "active"
      ? setDropdownStatus("inactive")
      : setDropdownStatus("active");
  };

  useEffect(() => {
    const closeDropdownHandler = (event) => {
      setDropdownStatus("inactive");
    };
    document.addEventListener("click", closeDropdownHandler);
    window.addEventListener("scroll", closeDropdownHandler);

    return () => {
      document.removeEventListener("click", closeDropdownHandler);
      window.removeEventListener("scroll", closeDropdownHandler);
    };
  }, [dropdownStatus]);

  return (
    <div className="navigation__container">
      <div className="navigation-items__container">
        <div className="navigation-left">
          <div className="navigation-item__container">
            <Link
              to="landingpage"
              className="name-link"
              spy={true}
              smooth={true}
              duration={500}
              offset={0}
            >
              Labib Islam
            </Link>
          </div>
        </div>
        <div className="navigation-right">
          <div
            className={`down-arrow__container ${dropdownStatus}`}
            tabIndex="0"
            onClick={dropdownStatusHandler}
            ref={dropdownRef}
          >
            <DownArrow className="down-arrow-icon" />
          </div>
          <div
            className={`right-navigation-items__container ${dropdownStatus}`}
          >
            {navLinks.map((item) => (
              <div className="navigation-item__container" key={item.name}>
                <Link
                  to={item.path}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={0}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
