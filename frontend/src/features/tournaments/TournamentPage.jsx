import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetTournamentByIdQuery,
  useUpdateTournamentMutation,
} from "../../services/apiSlice";
import { Form, Button } from "react-bootstrap";
import "./TournamentPage.css";

function TournamentPage() {
  const { id } = useParams();
  const {
    data: tournament,
    isFetching,
    isError,
    error,
  } = useGetTournamentByIdQuery(id);

  const [updateTournament, { isLoading: isUpdating }] =
    useUpdateTournamentMutation();

  // Initialize state with empty values
  const [tournamentRules, setTournamentRules] = useState("");
  const [tournamentPlayerCap, setTournamentPlayerCap] = useState("");
  const [tournamentEntryCost, setTournamentEntryCost] = useState("");
  const [tournamentStartTime, setTournamentStartTime] = useState("");

  // Update state based on fetched data
  useEffect(() => {
    if (tournament) {
      setTournamentRules(tournament.rules || "");
      setTournamentPlayerCap(tournament.playerCap || "");
      setTournamentEntryCost(tournament.entryCost || "");
      setTournamentStartTime(tournament.startTime || "");
    }
  }, [tournament]);

  // Check if the user is the TO and the tournament is in the preliminary stage
  const isTOAndPreliminary = tournament?.stage === "preliminary"; // Add logic to check if current user is the TO

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      rules: tournamentRules,
      playerCap: parseInt(tournamentPlayerCap, 10),
      entryCost: parseFloat(tournamentEntryCost),
      startTime: tournamentStartTime,
    };
    await updateTournament({ id, ...formData });
    // Handle the response
  };

  if (isFetching) {
    return <div className="custom-tournament-page">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="custom-tournament-page">Error: {error.toString()}</div>
    );
  }

  if (!tournament) {
    return (
      <div className="custom-tournament-page">No tournament data found.</div>
    );
  }

  return (
    <div className="custom-tournament-page">
      <div className="tournament-container">
        <div className="tournamentpage-card">
          <h1>{tournament.name}</h1>
          <div className="tournament-details">
            <p>Format: {tournament.format}</p>
            <p>Venue: {tournament.venue}</p>
            <p>Start Date: {tournament.start_date}</p>
            <p>End Date: {tournament.end_date}</p>
          </div>
          {isTOAndPreliminary && (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Tournament Rules</Form.Label>
                <Form.Control
                  type="text"
                  value={tournamentRules}
                  onChange={(e) => setTournamentRules(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Player Cap</Form.Label>
                <Form.Control
                  type="number"
                  value={tournamentPlayerCap}
                  onChange={(e) => setTournamentPlayerCap(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Entry Cost</Form.Label>
                <Form.Control
                  type="number"
                  value={tournamentEntryCost}
                  onChange={(e) => setTournamentEntryCost(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={tournamentStartTime}
                  onChange={(e) => setTournamentStartTime(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isUpdating}>
                Submit
              </Button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}

export default TournamentPage;
