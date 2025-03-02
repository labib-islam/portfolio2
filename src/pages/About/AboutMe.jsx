import React, { useEffect, useState } from "react";

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
      {data && (
        <div className="page-aboutme">
          <div className="aboutmepage-left__container">
            <div className="aboutmepage-image__container">
              <img src={data.Profile} alt="" />
            </div>
          </div>
          <div className="aboutmepage-right__container">
            <h1>About Me</h1>
            <hr className="h-line" />
            <p>{data.aboutMe}</p>
          </div>
        </div>
      )}
    </div>
  );
};
