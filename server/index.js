const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const { addPlayer, removePlayer, getPlayer, getPlayersInRoom } = require("./players");

const PORT = process.env.PORT || 5000;
const router = require("./router");

const app = express();

// our server instance
const server = http.createServer(app);

const io = socketIO(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
		credentials: true,
	},
});

io.on("connection", (socket) => {
	socket.on("join", ({ name, room, creator }, cb) => {
		console.log(name, room);
		const { error, player } = addPlayer({ id: socket.id, name, room, creator });
		if (error) return cb(error);

		socket.emit("message", {
			player: "admin",
			text: `Welcome ${player.name} to ${player.room}`,
		});
		socket.broadcast
			.to(player.room)
			.emit("message", { player: "admin", text: `${player.name} has joined` });
		socket.join(player.room);

		cb();
	});

	socket.on("sendMsg", (msg, cb) => {
		const player = getPlayer(socket.id);
		// console.log(player);
		// console.log(player.room);
		io.to(player.room).emit("message", { player: player.name, text: msg });
		cb();
	});

	socket.on("disconnect", (name, cb) => {
		console.log("player left");
		const player = removePlayer(socket.id);
		if (player){
			io.to(player.room).emit('message', {player: "admin", text: `${player.name} has left`})
		}
	});
});

app.use(router);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
