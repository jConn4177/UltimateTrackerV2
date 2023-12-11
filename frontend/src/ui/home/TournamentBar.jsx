// src/ui/home/TournamentBar.jsx
import React from "react";
import { Container, Row } from "react-bootstrap";
import TournamentCard from "./TournamentCard";
import { useGetTournamentsQuery } from "../../services/apiSlice";
import { useSelector } from "react-redux";
import { selectSearchInput } from "../../features/tournaments/searchSlice";
import "./TournamentBar.css";

function TournamentBar() {
  const { data: tournaments, isLoading, isError } = useGetTournamentsQuery();
  const searchInput = useSelector(selectSearchInput);

  const filteredTournaments = tournaments?.filter(
    (tournament) =>
      tournament.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      tournament.venue.toLowerCase().includes(searchInput.toLowerCase()) ||
      tournament.start_date.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (isLoading) return <p>Loading tournaments...</p>;
  if (isError) return <p>Error loading tournaments.</p>;

  return (
    <Container id="tournament-bar" className="my-3">
      <Row xs={1} md={2} lg={4} className="g-4">
        {tournaments &&
          tournaments.map(
            (tournament) =>
              tournament &&
              tournament.tournament_id && (
                <TournamentCard
                  key={tournament.tournament_id}
                  tournament={tournament}
                />
              )
          )}
      </Row>
    </Container>
  );
}

export default TournamentBar;
