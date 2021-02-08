import React from "react";
import './Message.css';

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
			<p className="msgSender msgSenderSelf">{player}: &nbsp;</p>
			<p className="msgText">{text}</p>
		</div>
	) : isSentByAdmin ? (
		<div className="msgCont">
			<p className="adminText">{text}</p>
		</div>
	) : (
		<div className="msgCont">
			<p className="msgSender">{player}: &nbsp;</p>
			<p className="msgText">{text}</p>
		</div>
	);
};
export default Message;
