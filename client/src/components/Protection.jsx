import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

export default function Protection(props) {
  const loggedData = useContext(UserContext);

  return loggedData?.loggedUser ? (
    <props.Component />
  ) : (
    <Navigate to="/login" />
  );
}
