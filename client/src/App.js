import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Join from "./components/Join/Join";
import Lobby from "./components/Lobby/Lobby";

const App = () => (
	<Router>
		<Route path="/" exact component={Join} />
		<Route path="/lobby" component={Lobby} />
	</Router>
);

export default App;
