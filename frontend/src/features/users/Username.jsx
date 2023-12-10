import React from "react";
import { useSelector } from "react-redux";

function Username() {
  const username = useSelector((state) => state.user.username);

  if (!username) return null;

  return <div>{username}</div>;
}

export default Username;
