import React, { useEffect, useRef, useState } from "react";
import ImageSlider from "./ImageSlider";
import GithubLogo from "../../assets/socials/github-logo.svg?react";
import LinkIcon from "../../assets/icons/link-icon.svg?react";

import "./Projects.css";
import { Link } from "react-router";

const Projects = () => {
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_SHEET_LINK}/Projects`
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
    <div id="projects" className="page__container test">
      <div className="page-experience">
        <div className="page-content">
          <h1>Projects</h1>
          {/* <hr className="h-line" /> */}
          <ul className="no-style-ul project-cards__container">
            {data &&
              data.map((item, index) => (
                <li key={item.Name} className="no-style-li">
                  <div className="card__container">
                    <div className="card-top">
                      <ImageSlider
                        imageList={item.Images?.split(", ") || []}
                        id={`id-${index + 1}`}
                      />
                    </div>
                    <div className="card-bottom">
                      <div>
                        <h2>{item.Name}</h2>
                        <Link to={item.Github} target="_blank">
                          <div className="card-link__container">
                            <GithubLogo className="logo-item" />
                          </div>
                        </Link>
                        {item.Link && (
                          <Link to={item.Link} target="_blank">
                            <div className="card-link__container">
                              <LinkIcon className="icon-item" />
                            </div>
                          </Link>
                        )}
                      </div>
                      <p>{item.Description}</p>
                      <span>{item.Stack}</span>
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

export default Projects;
