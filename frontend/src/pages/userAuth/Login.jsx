// src/pages/LoginPage.js
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../controllers/userController";
import { UserContext } from "../../context/UserContext";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const { email, password } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { email, password } = formData;

		try {
			//Login user
			await loginUser(email, password);
			//Set user state
			setUser({ email, posts: [] });
			//Route user to dashboard
			navigate("/");
		} catch (error) {
			setError(error);

			// Clear the error after 10 seconds
			setTimeout(() => {
				setError("");
			}, 30000); // 10 seconds in milliseconds
		}
	};

	return (
		<div className="h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-lg w-full space-y-8 mt-6 shadow-md p-12">
				{error && (
					<p className="bg-red-300 text-xs mt-2 text-red-800 p-1 rounded-md justify-left items-center flex px-6">
						<i className="fa-solid fa-triangle-exclamation text-2xl mr-4"></i>
						<span className="font-medium text-sm">
							{error.message}
						</span>
					</p>
				)}
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Sign in
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<input type="hidden" name="remember" value="true" />
					<div className="rounded-md shadow-sm space-y-3">
						<div>
							<label
								htmlFor="email"
								className=" bg-gray-300 text-xs text-gray-600 px-1 rounded-sm"
							>
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-700 focus:border-gray-700 focus:z-10 sm:text-sm"
								placeholder="Email address"
								value={email}
								onChange={handleChange}
							/>
						</div>
						<div className="relative">
							<label
								htmlFor="password"
								className="bg-gray-300 text-xs text-gray-600 px-1 rounded-sm"
							>
								Password
							</label>
							<input
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								autoComplete="current-password"
								required
								className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-700 focus:border-gray-800 focus:z-10 sm:text-sm"
								placeholder="Password"
								value={password}
								onChange={handleChange}
							/>
							<div
								onClick={togglePasswordVisibility}
								className="absolute right-4 bottom-2 z-10 cursor-pointer"
							>
								{showPassword ? (
									<i className="fa-solid fa-eye-slash text-gray-700"></i>
								) : (
									<i className="fa-solid fa-eye text-gray-700"></i>
								)}
							</div>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#00756a] hover:bg-white hover:text-[#00756a] hover:border-2 hover:border-[#00756a]"
						>
							Sign in
						</button>
					</div>
					<div className=" items-center flex justify-center">
						<Link
							className="text-sm text-blue-500 hover:text-blue-800 "
							to={"/register"}
						>
							Don't have an account yet? Register
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
