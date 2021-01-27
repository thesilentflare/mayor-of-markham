const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

// our localhost port
const port = process.env.PORT || 5000;

const app = express();

// our server instance
const server = http.createServer(app);

const {
	addPlayer,
	removePlayer,
	getPlayer,
	getPlayersInRoom,
} = require("./players");

// This creates our socket using the instance of the server
const io = socketIO(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
		credentials: true,
	},
});

// This is what the socket.io syntax is like, we will work this later
io.on("connect", (socket) => {
	socket.on("join", ({ name, room }, callback) => {
		const { error, player } = addPlayer({ id: socket.id, name, room });

		if (error) return callback(error);

		socket.join(player.room);

		socket.emit("message", {
			player: "admin",
			text: `${player.name}, welcome to room ${player.room}.`,
		});
		socket.broadcast
			.to(player.room)
			.emit("message", { player: "admin", text: `${player.name} has joined!` });

		io.to(player.room).emit("roomData", {
			room: player.room,
			players: getPlayersInRoom(player.room),
		});

		callback();
	});

	socket.on("sendMessage", (message, callback) => {
		const player = getPlayer(socket.id);

		io.to(player.room).emit("message", { player: player.name, text: message });

		callback();
	});

	socket.on("disconnect", () => {
		const player = removePlayer(socket.id);

		if (player) {
			io.to(player.room).emit("message", {
				player: "Admin",
				text: `${player.name} has left.`,
			});
			io.to(player.room).emit("roomData", {
				room: player.room,
				players: getPlayersInRoom(player.room),
			});
		}
	});
});

server.listen(port, () => console.log(`Listening on port ${port}`));
