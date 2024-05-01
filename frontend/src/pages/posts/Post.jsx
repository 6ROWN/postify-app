import React, { useState, useContext } from "react";
import { deletePost, setPost } from "../../controllers/postController";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import TruncateText from "../../components/TruncateText";

const MessageDisplay = ({ message, className }) => {
	return message && <p className={className}>{message}</p>;
};

const Post = ({ post, isDashboard }) => {
	const { body, createdAt, title, email, _id } = post;
	const [deletionMessage, setDeletionMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const { user, setUser } = useContext(UserContext);

	const handleDeletionMessage = (message) => {
		setDeletionMessage(message);
		setTimeout(() => {
			setDeletionMessage("");
		}, 3000); // Clear the message after 5 seconds
	};

	const handleErrorMessage = (error) => {
		console.error("Error deleting post:", error);
		setErrorMessage("Error deleting post. Please try again.");
		setTimeout(() => {
			setErrorMessage("");
		}, 3000); // Clear the message after 5 seconds
	};

	const onDelete = async (id) => {
		if (confirm("Are you sure you want to delete this post")) {
			try {
				await deletePost(id);
				handleDeletionMessage("Post successfully deleted");

				// Update the state after deletion
				const newPosts = user.posts.filter((post) => post._id !== id);
				setUser({ ...user, posts: newPosts });
			} catch (error) {
				handleErrorMessage(error);
			}
		}
	};

	return (
		<div className="max-w-xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
			<MessageDisplay
				message={deletionMessage}
				className="fixed bg-white rounded-lg p-4 right-1/2 transform translate-x-1/2 z-10 text-green-600 top-28"
			/>
			<MessageDisplay
				message={errorMessage}
				className="fixed bg-white rounded-lg p-4 right-1/2 transform translate-x-1/2 z-10 text-red-600 top-30"
			/>

			<div className="p-6">
				<h2 className="text-2xl font-bold mb-2">{title}</h2>
				<p className="text-gray-600 text-xs mb-2">
					{new Date(createdAt).toDateString()}
				</p>
				{/* <p className="text-gray-800">
					
				</p> */}
				<TruncateText text={body} maxLength={150} />
				<div className="flex justify-between items-center mt-4">
					<div className="text-xs text-gray-400 flex space-x-2 items-center">
						<i className="fa-regular fa-user"></i>
						<span>{email ? email : "user"}</span>
					</div>
					{isDashboard && (
						<div>
							<Link
								to={"/update"}
								state={{ post }}
								//onClick={onEdit}
								className="mr-4 text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
							>
								Edit
							</Link>
							<button
								onClick={() => onDelete(_id)}
								className="text-red-600 hover:text-red-800 font-medium focus:outline-none"
							>
								Delete
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Post;
