import React, { useState } from "react";

const TruncateText = ({ text, maxLength }) => {
	const [isTruncated, setIsTruncated] = useState(true);

	const toggleTruncate = () => {
		setIsTruncated(!isTruncated);
	};

	const truncatedText = isTruncated ? text.slice(0, maxLength) : text;

	return (
		<div className="">
			<p>{truncatedText}</p>
			{text.length > maxLength && (
				<span
					className="text-sky-500 text-sm cursor-pointer"
					onClick={toggleTruncate}
				>
					{isTruncated ? " ... more" : " less"}
				</span>
			)}
		</div>
	);
};

export default TruncateText;
