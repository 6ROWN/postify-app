import React from "react";

const ErrorPage = ({ message }) => {
	return (
		<div className="flex items-center justify-center h-[80vh]">
			<div className="flex flex-col items-center space-y-2">
				<div className="text-[#e70033] text-3xl animate-pulse">
					<i className="fa-solid fa-triangle-exclamation"></i>
				</div>
				<div>
					<h1>{message}</h1>
				</div>
			</div>
		</div>
	);
};

export default ErrorPage;
