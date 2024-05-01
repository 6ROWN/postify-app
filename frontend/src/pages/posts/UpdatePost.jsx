import React, { useState, useContext } from "react";
import { updatePost } from "../../controllers/postController";
import { useNavigate, useLocation } from "react-router-dom";
import { PostContext } from "../../context/PostContext";

const UpdatePost = () => {
	const location = useLocation();
	const { state } = location;
	const [title, setTitle] = useState(state.post.title);
	const [body, setBody] = useState(state.post.body);
	const [isLoading, setIsLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();
	const { posts, setPosts } = useContext(PostContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setTimeout(async () => {
			try {
				const data = await updatePost(state.post._id, title, body);
				setPosts([
					...posts.filter(
						(post) => post._id !== data.updatedPost._id
					),
					data.updatedPost,
				]);

				setSuccessMessage("Post successfully added.");
				setTimeout(() => {
					setSuccessMessage("");
				}, 3000);
				navigate("/dashboard");
			} catch (error) {
				console.error("Error submitting post:", error);
				setErrorMessage(
					error.message || "An error occurred while adding the post."
				);
				setTimeout(() => {
					setErrorMessage("");
				}, 5000);
			} finally {
				setIsLoading(false);
			}
		}, 3000);
	};

	return (
		<section className="container h-[90vh] flex items-center justify-center">
			<div className="max-w-xl w-full mx-auto bg-white p-6 rounded-lg shadow-lg">
				<h2 className="text-2xl font-semibold mb-6 text-center">
					Edit Post
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="title"
							className="block text-gray-700 font-bold mb-2"
						>
							Title
						</label>
						<input
							type="text"
							id="title"
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="body"
							className="block text-gray-700 font-bold mb-2"
						>
							Body
						</label>
						<textarea
							id="body"
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
							rows="6"
							value={body}
							onChange={(e) => setBody(e.target.value)}
							required
						></textarea>
					</div>
					<div className="text-center">
						<button
							type="submit"
							className={`w-full bg-[#00756a] hover:bg-gray-50 hover:border-2 hover:border-[#00756a] text-white hover:text-[#00756a] font-bold py-2 px-6 rounded ${
								isLoading && "opacity-50 cursor-not-allowed"
							}`}
							disabled={isLoading}
						>
							{isLoading ? "Submitting..." : "Submit"}
						</button>
						{successMessage && (
							<p className="text-[#00756a] mt-2">
								{successMessage}
							</p>
						)}
						{errorMessage && (
							<p className="text-red-600 mt-2">{errorMessage}</p>
						)}
					</div>
				</form>
			</div>
		</section>
	);
};

export default UpdatePost;
