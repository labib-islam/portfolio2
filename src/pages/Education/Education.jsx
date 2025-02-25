import React, { useEffect, useState } from "react";

import "./Education.css";

const Education = () => {
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_SHEET_LINK}/Education`
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
    <div id="education" className="page__container test">
      <div className="page-experience">
        <div className="page-content">
          <h1>Education</h1>
          <ul className="no-style-ul work-item__container">
            {data &&
              data.map((item) => (
                <li key={item.id} className="no-style-li work-item__card">
                  <div className="header__container">
                    <div className="pc__container">
                      <h2>{item.Degree}</h2>
                      <h3 className="text-italic">{item.Institute}</h3>
                    </div>
                    <hr />
                    <div className="ld__container">
                      <h3>{item.Duration}</h3>
                      <h3 className="text-italic">{item.Location}</h3>
                    </div>
                  </div>
                  {item.p1 && (
                    <div className="description__container">
                      <ul className="description-points">
                        {Object.keys(item)
                          .filter((key) => key.startsWith("p")) // Filter only keys starting with "p"
                          .map((pointKey, idx) => (
                            <li key={idx}>
                              <span className="bold">
                                {item[pointKey].split(": ")[0]}
                                {": "}
                              </span>{" "}
                              {item[pointKey].split(": ")[1]}
                            </li> // Dynamically render each point
                          ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Education;
