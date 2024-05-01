import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const GuessRoute = () => {
	const { user } = useContext(UserContext);

	return !user.email ? <Outlet /> : <Navigate to={"/"} />;
};

export default GuessRoute;
