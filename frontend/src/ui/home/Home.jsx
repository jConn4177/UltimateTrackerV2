import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import LogoCard from "./LogoCard";
import TournamentBar from "./TournamentBar";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const errRef = useRef();

  // useEffect(() => {
  //   errRef.current.focus();
  // }, []);

  return (
    <div id="home-page-container" className="p-3">
      <div className="logo-card-wrapper">
        <LogoCard navigate={navigate} errRef={errRef} />
      </div>
      <TournamentBar />
    </div>
  );
}

export default Home;
