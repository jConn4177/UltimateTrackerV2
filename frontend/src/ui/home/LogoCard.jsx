import React from "react";
import { Card, Button } from "react-bootstrap";
import "./LogoCard.css";

function LogoCard({ errRef, navigate }) {
  const handleMyTournamentClick = () => {
    navigate();
  };
  const handleOrganizeClick = () => {
    navigate("/tournaments/new");
  };

  return (
    <Card className="logo-card text-center">
      <Card.Body>
        <div className="logo-container">
          <img
            src="../../../public/images/image17.png"
            alt="Logo"
            className="logo-image"
          />
        </div>
        <Card.Title className="app-title">Ultimate Tracker.Gg</Card.Title>
        <Button
          variant="warning"
          onClick={handleOrganizeClick}
          className="organize-tournament-button"
        >
          ORGANIZE A TOURNAMENT
        </Button>
        <Button
          variant="warning"
          onClick={handleMyTournamentClick}
          className="my-tournaments-button"
        >
          MY TOURNAMENTS
        </Button>
      </Card.Body>
    </Card>
  );
}

export default LogoCard;
