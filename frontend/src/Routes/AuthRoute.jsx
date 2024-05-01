import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
	const { user } = useContext(UserContext);

	return user.email ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AuthRoute;
