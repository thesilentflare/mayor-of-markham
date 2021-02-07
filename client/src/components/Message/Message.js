import React from "react";

const Message = ({ msg: {text, user}, name }) => {
	let isSentByCurrentUser = false;

	const trimmedName = name.trim().toLowerCase();

	if (user === trimmedName) {
		isSentByCurrentUser = true;
	}

	return isSentByCurrentUser ? (
		<div className="msgCont">
			<h1>{trimmedName}</h1>
			<p>{text}</p>
		</div>
	) : (
		<div className="msgCont">
			<h5>{trimmedName}</h5>
			<p>{text}</p>
		</div>
	);
};
export default Message;
