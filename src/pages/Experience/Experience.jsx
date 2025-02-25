import React, { useEffect, useState } from "react";

import "./Experience.css";

const Experience = () => {
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_SHEET_LINK}/Experience`
      );
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="experience" className="page__container">
      <div className="page-experience">
        <div className="page-content">
          <h1>Work Experience</h1>
          {/* <hr className="h-line" /> */}
          <ul className="no-style-ul work-item__container">
            {data &&
              data.map((item) => (
                <li key={item.id} className="no-style-li work-item__card">
                  <div className="header__container">
                    <div className="pc__container">
                      <h2>{item.Position}</h2>
                      <h3 className="text-italic">{item.Company}</h3>
                    </div>
                    <hr />
                    <div className="ld__container">
                      <h3>{item.Duration}</h3>
                      <h3 className="text-italic">{item.Location}</h3>
                    </div>
                  </div>
                  <div className="description__container">
                    <p>{item.Description}</p>
                    <ul className="description-points">
                      {Object.keys(item)
                        .filter((key) => key.startsWith("p")) // Filter only keys starting with "p"
                        .map((pointKey, idx) => (
                          <li key={idx}>{item[pointKey]}</li> // Dynamically render each point
                        ))}
                    </ul>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Experience;
