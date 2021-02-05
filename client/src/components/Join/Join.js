import React, { useState } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

const Join = ({ location }) => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
  const urlRoom = queryString.parse(location.search);
	//console.log(urlRoom);
  // still need to fix joining given url room
	return (
		<div className="joinOuterContainer">
			<div className="joinInnerContainer">
				<h1 className="heading">Join</h1>
				<div>
					<input
						placeholder="Name"
						className="joinInput"
						type="text"
						onChange={(event) => setName(event.target.value)}
					/>
				</div>
				<div>
					<input
						placeholder="Room Code"
						value={urlRoom ? urlRoom.room : ""}
						className="joinInput mt-20"
						type="text"
						onChange={(event) => setRoom(event.target.value)}
					/>
				</div>
				<Link
					onClick={(e) => (!name || !room ? e.preventDefault() : null)}
					to={`/lobby?room=${room}&name=${name}`}
				>
					<button className={"button mt-20"} type="submit">
						Join Lobby
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Join;
