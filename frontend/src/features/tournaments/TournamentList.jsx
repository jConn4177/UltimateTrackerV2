import React from "react";
import { useGetTournamentsQuery } from "../../services/apiSlice";
import TournamentPage from "./TournamentPage";

function TournamentList() {
  const { data: tournaments, error, isLoading } = useGetTournamentsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tournaments</div>;

  return (
    <ul>
      {tournaments?.map((tournament) => (
        <TournamentPage tournament={tournament} key={tournament.id} />
      ))}
    </ul>
  );
}

export default TournamentList;
