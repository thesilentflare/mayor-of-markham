const players = [];
const rooms = [];

const addPlayer = ({ id, name, room, creator }) => {
	name = name.trim().toLowerCase();
	room = room.trim().toLowerCase();

	const existingPlayer = players.find(
		(player) => player.room === room && player.name === name
	);
	const numPlayersInRoom = getPlayersInRoom(room).length;
	console.log(numPlayersInRoom);

	if (!name || !room) return { error: "Username and room are required." };
	if (existingPlayer) return { error: "Username is taken." };
	if (numPlayersInRoom == 4) return { error: "Room is full." };
	if (getRoom(room).length === 0 && creator === 'false') return { error: "Lobby DNE" };
	console.log(getRoom(room));

	const player = { id, name, room };
	const rm = { room, players };

	players.push(player);
	rooms.push(rm);

	return { player };
};

const removePlayer = (id) => {
	const index = players.findIndex((player) => player.id === id);

	if (index !== -1) return players.splice(index, 1)[0];
};

const getPlayer = (id) => players.find((player) => player.id === id);

const getPlayersInRoom = (room) =>
	players.filter((player) => player.room === room);

const getRoom = (room) => rooms.filter((room) => room.room === room);

module.exports = {
	addPlayer,
	removePlayer,
	getPlayer,
	getPlayersInRoom,
	getRoom,
};
