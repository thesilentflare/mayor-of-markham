import React from "react";

const Message = ({ msg: { player, text }, name }) => {
	let isSentByCurrentPlayer = false;
	let isSentByAdmin = false;

	const trimmedName = name.trim().toLowerCase();

	if (player === trimmedName) {
		isSentByCurrentPlayer = true;
	}
	if (player === "admin") {
		isSentByAdmin = true;
	}

	return isSentByCurrentPlayer ? (
		<div className="msgCont">
			<h1>{player}</h1>
			<p>{text}</p>
		</div>
	) : isSentByAdmin ? (
		<div className="msgCont">
			<p className="adminText">{text}</p>
		</div>
	) : (
		<div className="msgCont">
			<h5>{player}</h5>
			<p>{text}</p>
		</div>
	);
};
export default Message;
