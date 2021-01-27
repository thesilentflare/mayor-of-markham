import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

	return (
        <div className="joinOuterContainer">
          <div className="joinInnerContainer">
            <h1 className="heading">Join</h1>
            <div>
              <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
            </div>
            <div>
              <input placeholder="Room Code" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
            </div>
            <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/lobby?name=${name}&room=${room}`}>
              <button className={'button mt-20'} type="submit">Join Lobby</button>
            </Link>
            <Link onClick={e => (!name) ? e.preventDefault() : null} to={`/lobby?name=${name}&room=${room}`}>
              <button className={'button mt-20'} type="submit">Create New Lobby</button>
            </Link>
          </div>
        </div>
      );
};

export default Join;
