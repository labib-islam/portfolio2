import React, { useEffect, useState } from "react";

import "./Skills.css";

const Skills = () => {
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_SHEET_LINK}/Skills`
      );
      const resData = await res.json();
      const groupedSkills = resData.reduce((acc, skill) => {
        if (!acc[skill.Type]) {
          acc[skill.Type] = [];
        }
        acc[skill.Type].push(skill);
        return acc;
      }, {});
      setData(groupedSkills);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="skills" className="page__container">
      <div className="page-experience">
        <div className="skill-page-content">
          <h1>Skills</h1>
          <ul className="no-style-ul skill-cards__container">
            {data &&
              Object.entries(data).map(([type, skills]) => (
                <li key={type} className="no-style-li">
                  <div className="skill-card__container">
                    <h3>{type}</h3>

                    <div className="skills__container">
                      {skills.map((skill, index) => (
                        <div key={index} className="skill-item">
                          <div className="skill-logo__container">
                            <img src={skill.Logo} alt="" />
                          </div>

                          <h4>{skill.Name}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Skills;
