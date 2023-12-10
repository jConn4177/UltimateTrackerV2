import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./TournamentCard.css";

function TournamentCard({ tournament }) {
  const navigate = useNavigate();

  // Function to handle card click and navigate to the tournament details page
  const handleCardClick = () => {
    navigate(`/tournaments/${tournament.tournament_id}`);
  };

  return (
    <Card className="tournament-card" onClick={handleCardClick}>
      <Card.Img variant="top" src="../../../public/images/rvrlogo.png" />
      <Card.Body>
        <Card.Title>{tournament.name}</Card.Title>
        <Card.Text>{tournament.start_date}</Card.Text>{" "}
        {/* Adjust format as needed */}
        <Card.Text>{tournament.end_date}</Card.Text>{" "}
        {/* Adjust format as needed */}
        <Card.Text>{tournament.playersRegistered}</Card.Text>{" "}
        {/* Example property */}
        <Card.Text>{tournament.venue}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TournamentCard;
