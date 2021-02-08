const players = [];
const rooms = [];

const addPlayer = ({ id, name, room, creator }) => {
	name = name.trim().toLowerCase();
	room = room.trim();

	const existingPlayer = players.find(
		(player) => player.room === room && player.name === name
	);

	const numPlayersInRoom = getPlayersInRoom(room).length;
	console.log(numPlayersInRoom);

	if (!name || !room) return { error: "Username and room are required." };
	if (existingPlayer) return { error: "Username is taken." };
	if (numPlayersInRoom == 4) return { error: "Room is full." };
	if (rooms.findIndex((r) => r.room === room) !== -1) {
		// amend changes to list here
		console.log("here");
		rooms[rooms.findIndex((r) => r.room === room)].numPlayers++;
	} else {
    if (creator === "false") return { error: "Lobby DNE" };
		const numPlayers = 1;
		const rm = { room, numPlayers };
		rooms.push(rm);
	}
	const player = { id, name, room };
	players.push(player);
	// console.log(typeof room);
	// console.log(rooms.find((r) => r.room === room));
	console.log("players", players);
	console.log("rooms", rooms);
	// console.log(existingRoom);
	return { player };
};

const removePlayer = (id) => {
  const index = players.findIndex((player) => player.id === id);
  let room = "";
	if (index !== -1) {
    room = players[index].room;
		rooms[rooms.findIndex((r) => r.room === room)].numPlayers--;
		if (rooms[rooms.findIndex((r) => r.room === room)].numPlayers === 0) {
			console.log("delete room");
			rooms.splice(rooms[rooms.findIndex((r) => r.room === room)], 1);
		}
		return players.splice(index, 1)[0];
	}
};

const getPlayer = (id) => players.find((player) => player.id === id);

const getPlayersInRoom = (room) =>
	players.filter((player) => player.room === room);

const getRoom = (rm) => rooms.find((room) => room.room === room);

module.exports = {
	addPlayer,
	removePlayer,
	getPlayer,
	getPlayersInRoom,
	getRoom,
};
