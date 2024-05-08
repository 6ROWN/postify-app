//Get all posts
const getPosts = async () => {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/api/posts`
	);
	const data = response.json();

	if (!response.ok) {
		throw new Error(data.error);
	}

	return data;
};

//Get user
const getUserPosts = async () => {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/api/posts/user`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error);
	}

	return data;
};

//Create new post
const setPost = async (title, body) => {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/api/posts`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({ title, body }),
		}
	);

	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.error);
	}
	return data;
};

// Edit post
const updatePost = async (id, title, body) => {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/api/posts/${id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({ title, body }),
		}
	);
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.error);
	}
	return data;
};

// Delete post
const deletePost = async (id) => {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/api/posts/${id}`,
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);

	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.error);
	}
	console.log(data);
	return data;
};

export { getPosts, getUserPosts, setPost, updatePost, deletePost };
