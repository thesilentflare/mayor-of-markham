import React from "react";
import Messages from "./Messages/Messages";

const Chat = ({ msg, msgs, name, setMsg, sendMsg }) => (
	<div>
		<Messages msgs={msgs} name={name} />
		<form>
			<input
				value={msg}
				onChange={(event) => setMsg(event.target.value)}
				onKeyPress={(event) => (event.key === "Enter" ? sendMsg(event) : null)}
			/>
			<button onClick={(event) => sendMsg(event)}>SEND</button>
		</form>
	</div>
);
export default Chat;
