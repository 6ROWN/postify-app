import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/userAuth/Login";
import Register from "./pages/userAuth/Register";
import Dashboard from "./pages/userAuth/Dashboard";
import Home from "./pages/posts/Home";
import PostForm from "./pages/posts/PostForm";
import UpdatePost from "./pages/posts/UpdatePost";
import AuthRoute from "./Routes/AuthRoute";
import GuessRoute from "./Routes/GuessRoute";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route element={<AuthRoute />}>
						<Route index element={<Home />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="create" element={<PostForm />} />
						<Route path="update" element={<UpdatePost />} />
					</Route>
					<Route element={<GuessRoute />}>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Route>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
