import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import { Routes, Route, HashRouter } from "react-router";
import viteLogo from "/vite.svg";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import Layout from "./layout/Layout";
import { AboutMe } from "./pages/About/AboutMe";
import Experience from "./pages/Experience/Experience";
import Projects from "./pages/Project/Projects";
import Skills from "./pages/Skill/Skills";
import Education from "./pages/Education/Education";
import Contact from "./pages/Contact/Contact";

function App() {
  return (
    <HashRouter>
      <Layout />
      <LandingPage />
      <AboutMe />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </HashRouter>
  );
}

export default App;
