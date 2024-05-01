import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserProvider from "./context/UserContext.jsx";
import PostProvider from "./context/PostContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<UserProvider>
			<PostProvider>
				<App />
			</PostProvider>
		</UserProvider>
	</React.StrictMode>
);
