const loginUser = async (email, password) => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_SERVER_URL}/api/users/login`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			}
		);

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message);
		}

		localStorage.setItem("email", data?.email);
		localStorage.setItem("token", data?.token);

		return data;
	} catch (error) {
		throw new Error(error);
	}
};

const registerUser = async (email, password, confirmPassword) => {
	if (password !== confirmPassword) {
		throw new Error("Passwords do not match.");
	}

	try {
		const response = await fetch(
			`${import.meta.env.VITE_SERVER_URL}/api/users/`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			}
		);

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message);
		}

		localStorage.setItem("email", data?.email);
		localStorage.setItem("token", data?.token);

		console.log("Registration successful:", data);

		return data;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

export { loginUser, registerUser };
