import React, { useEffect, useState } from "react";
import ProfileImage from "../../assets/about-me/about-image.png";

import "./AboutMe.css";

export const AboutMe = () => {
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_SHEET_LINK}/AboutMe`
      );
      const data = await res.json();
      setData(data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="aboutme" className="page__container test">
      <div className="page-aboutme">
        <div className="aboutmepage-left__container">
          <div className="aboutmepage-image__container">
            <img src={ProfileImage} alt="" />
          </div>
        </div>
        <div className="aboutmepage-right__container">
          <h1>About Me</h1>
          <hr className="h-line" />
          {data && <p>{data.aboutMe}</p>}
        </div>
      </div>
    </div>
  );
};
