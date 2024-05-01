import React from "react";

const Spinner = () => {
	return (
		<div className="flex items-center justify-center h-[80vh]">
			<div className="text-[#00756a] text-3xl animate-spin">
				<i className="fa-solid fa-spinner"></i>
			</div>
		</div>
	);
};

export default Spinner;
