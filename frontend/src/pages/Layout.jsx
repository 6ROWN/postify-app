import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Layout = () => {
	const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		if (confirm("Confirm logout")) {
			setUser({ email: null, posts: [] });
			localStorage.removeItem("email");
			localStorage.removeItem("token");
			navigate("/login");
		}
	};

	return (
		<>
			<nav className="bg-[#00756a] py-4">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex-shrink-0">
							<Link
								to="/"
								className="text-white text-xl font-bold "
							>
								<i className="fa-solid fa-house text-3xl"></i>
							</Link>
						</div>
						{/* Navigation Links */}
						{!user.email ? (
							<div className="">
								<div className=" flex items-baseline space-x-6">
									<Link
										title="Login"
										to="/login"
										className="bg-gray-50 text-[#00756a] hover:text-gray-500 px-3 py-2 rounded-md font-bold flex items-center justify-center space-x-2 ease-in"
									>
										<span className="text-sm">Login</span>
										<i className="fa -solid fa-right-to-bracket text-sm"></i>
									</Link>

									<Link
										title="Register"
										to="/register"
										className="bg-gray-50 text-[#00756a] hover:text-gray-500 px-3 py-2 rounded-md font-bold flex items-center justify-center space-x-2 ease-in"
									>
										<span className="text-sm">
											Register
										</span>
										<i className="fa-solid fa-user-plus text-sm"></i>
									</Link>
								</div>
							</div>
						) : (
							<div className="flex items-center justify-center space-x-6">
								<Link
									className="text-gray-200 text-sm"
									to={"/dashboard"}
								>
									Dashboard
								</Link>
								<button
									onClick={handleLogout}
									title="logout"
									className="bg-gray-50 text-[#00756a] hover:text-gray-500 px-3 py-2 rounded-md font-bold flex items-center justify-center space-x-2 ease-in"
								>
									<span className="text-sm">Logout</span>
									<i className="fa-solid fa-right-from-bracket text-xs"></i>
								</button>
							</div>
						)}
					</div>
				</div>
			</nav>
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
