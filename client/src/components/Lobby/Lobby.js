import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Messages from "../Messages/Messages";
import "./Lobby.css";

let socket;

const Lobby = ({ location }) => {
	const FRONTEND = "http://localhost:3000";
	const ENDPOINT = "http://localhost:5000";
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [msg, setMsg] = useState("");
	const [msgs, setMsgs] = useState([]);
	const [creator, setCreator] = useState("false");
	const [joinLink, setJoinLink] = useState("");

	useEffect(() => {
		const { name, room, creator } = queryString.parse(location.search);

		socket = io(ENDPOINT);

		setName(name);
		setRoom(room);
		setCreator(creator);
		setJoinLink(`${FRONTEND}/join?room=${room}`);

		socket.emit("join", { name, room, creator }, (error) => {
			if (error) {
				window.location.replace(`${FRONTEND}/join`);
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

	useEffect(() => {
		socket.on("changeLeader", (change) => {
			setCreator("true");
		});
	});

	const sendMsg = (event) => {
		event.preventDefault();
		if (msg) {
			socket.emit("sendMsg", msg, () => setMsg(""));
		}
	};

	console.log(msg, msgs);
	return (
		<div className="outerCont">
			<h1>LOBBY</h1>
			<div className="lobbyCont">
				<div className="gameCont"></div>
				<div className="chatCont">
					<Messages msgs={msgs} name={name} />
					<form>
						<input
							value={msg}
							onChange={(event) => setMsg(event.target.value)}
							onKeyPress={(event) =>
								event.key === "Enter" ? sendMsg(event) : null
							}
						/>
						<button onClick={(event) => sendMsg(event)}>SEND</button>
					</form>
				</div>
			</div>
			{creator === "true" ? <div>Start Game</div> : null}
			<div>Join Link: {joinLink}</div>
		</div>
	);
};

export default Lobby;
