import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<>
			<nav className="bg-gray-800 py-4">
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
						<div className="">
							<div className=" flex items-baseline space-x-6">
								<Link
									to="/login"
									className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								>
									<i className="fa-solid fa-right-to-bracket text-xl"></i>
								</Link>

								<Link
									to="/register"
									className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								>
									<i className="fa-solid fa-user-plus text-xl"></i>
								</Link>
							</div>
						</div>
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
