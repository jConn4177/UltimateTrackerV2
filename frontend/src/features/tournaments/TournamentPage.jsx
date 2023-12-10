import React from "react";
import { useParams } from "react-router-dom";
import { useGetTournamentByIdQuery } from "../../services/apiSlice";
import "./TournamentPage.css";

function TournamentPage() {
  const { id } = useParams();
  const {
    data: tournament,
    isFetching,
    isError,
    error,
  } = useGetTournamentByIdQuery(id);

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
        <div className="tournament-card">
          <h1>{tournament.name}</h1>
          <div className="tournament-details">
            <p>Format: {tournament.format}</p>
            <p>Venue: {tournament.venue}</p>
            <p>Start Date: {tournament.start_date}</p>
            <p>End Date: {tournament.end_date}</p>
            {/* Additional tournament details can be added here */}
          </div>
          {/* Additional details or components can be added here */}
        </div>
      </div>
    </div>
  );
}

export default TournamentPage;
