import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Messages from "../Messages/Messages";

let socket;

const Lobby = ({ location }) => {
	const ENDPOINT = "localhost:5000";
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [msg, setMsg] = useState("");
	const [msgs, setMsgs] = useState([]);
	const [creator, setCreator] = useState("false");

	useEffect(() => {
		const { name, room, creator } = queryString.parse(location.search);

		socket = io(ENDPOINT);

		setName(name);
		setRoom(room);
		setCreator(creator);

		socket.emit("join", { name, room, creator }, (error) => {
			if (error) {
				window.location.replace("http://localhost:3000/join");
				alert(error);
			}
		});

		return () => {
			socket.emit("disconnect", { name, room }, () => {});
			socket.off();
		};
	}, [ENDPOINT, location.search]);

	useEffect(() => {
		socket.on("message", (msg) => {
			setMsgs([...msgs, msg]);
		});
	}, [msgs]);

	const sendMsg = (event) => {
		event.preventDefault();
		if (msg) {
			socket.emit("sendMsg", msg, () => setMsg(""));
		}
	};

	console.log(msg, msgs);
	return (
		<div className="outerCont">
			<div className="cont">
				<Messages msgs={msgs} name={name} />
				<input
					value={msg}
					onChange={(event) => setMsg(event.target.value)}
					onKeyPress={(event) =>
						event.key === "Enter" ? sendMsg(event) : null
					}
				/>
			</div>
		</div>
	);
};

export default Lobby;
