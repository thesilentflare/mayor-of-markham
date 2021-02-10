import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Chat from "../Chat/Chat.js";
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
	const [gameStart, setGameStart] = useState("false");

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

	const gameStart = (event) => {
		event.preventDefault();
		socket.emit("sendStartGame", room, (error) => {
			if (error) alert(error);
			else setGameStart("true");
		});
	};

	console.log(msg, msgs);
	return (
		<div className="outerCont">
			<h1>LOBBY</h1>
			<div className="lobbyCont">
				<div className="gameCont"></div>
				<div className="chatCont">
					<Chat
						msg={msg}
						msgs={msgs}
						name={name}
						setMsg={setMsg}
						sendMsg={sendMsg}
					/>
				</div>
			</div>
			{creator === "true" ? (
				<div>
					<button onClick={(event) => gameStart(event)}>Start Game</button>
				</div>
			) : null}
			<div>Join Link: {joinLink}</div>
		</div>
	);
};

export default Lobby;
