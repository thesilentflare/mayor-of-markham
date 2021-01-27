import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu/MainMenu";
import Join from "./components/Join/Join";
import Create from "./components/Create/Create";
import Lobby from "./components/Lobby/Lobby";

const App = () => (
	<Router>
		<Route path="/" exact component={MainMenu} />
		<Route path="/join" component={Join} />
		<Route path="/create" component={Create} />
		<Route path="/lobby" component={Lobby} />
	</Router>
);

export default App;
