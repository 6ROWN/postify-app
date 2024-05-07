import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
<<<<<<< HEAD
			"/api": process.env.VITE_SERVER_URL,
=======
			"/api": "https://postify-app.onrender.com",
>>>>>>> f9eee8dba6d9fcf59b4b3b6e51f3272522bbec32
		},
	},
});
