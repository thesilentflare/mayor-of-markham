import React from 'react';
import { Link } from "react-router-dom";

const MainMenu = () => {
	return (
        <div className="joinOuterContainer">
          <div className="joinInnerContainer">
            <h1 className="heading">Mayor of Markham</h1>
            <Link to={`/create`}>
              <button className={'button mt-20'} type="submit">Create Lobby</button>
            </Link>
            <Link to={`/join`}>
              <button className={'button mt-20'} type="submit">Join Lobby</button>
            </Link>
          </div>
        </div>
      );
};

export default MainMenu;
