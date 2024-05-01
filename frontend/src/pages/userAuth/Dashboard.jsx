import React, { useContext, useEffect, useState } from "react";
import { getUserPosts } from "../../controllers/postController";
import Post from "../posts/Post";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import ErrorPage from "../../components/ErrorPage";

const Dashboard = () => {
	const { user, setUser } = useContext(UserContext);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getUserPosts();
				setUser((prevUser) => ({ ...prevUser, posts: data.post }));
			} catch (error) {
				console.error(error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <ErrorPage message={error} />;
	}

	return (
		<section className="container p-2 lg:p-8 mx-auto bg-gray-200 min-h-screen">
			<div className=" max-w-7xl mx-auto p-8">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-2xl font-bold">Dashboard</h1>
					<Link to={"/create"}>
						<div className="border-2 text-[#00756a] bg-gray-50 border-[#00756a] p-2 rounded flex space-x-2 items-center font-medium">
							<i className="fa-solid fa-plus"></i>
							<span> Create Post</span>
						</div>
					</Link>
				</div>

				{user.posts && user.posts.length > 0 ? (
					<div className="grid grid-cols- lg:grid-cols-2 gap-8">
						{user.posts.map((post) => (
							<div key={post?._id}>
								<Post post={post} isDashboard={true} />
							</div>
						))}
					</div>
				) : (
					<div>
						<p className="text-center text-gray-600 py-20 text-lg">
							No posts available.
						</p>
					</div>
				)}
			</div>
		</section>
	);
};

export default Dashboard;
