const players = [];

const addPlayer = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingPlayer = Players.find((player) => player.room === room && player.name === name);
  const numPlayersInRoom = getPlayersInRoom(room).length();
  console.log(numPlayersInRoom);

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingPlayer) return { error: 'Username is taken.' };
  if(numPlayersInRoom == 4) return { error: 'Room is full.' };

  const player = { id, name, room };

  Players.push(player);

  return { player };
}

const removePlayer = (id) => {
  const index = Players.findIndex((player) => player.id === id);

  if(index !== -1) return Players.splice(index, 1)[0];
}

const getPlayer = (id) => Players.find((player) => player.id === id);

const getPlayersInRoom = (room) => Players.filter((player) => player.room === room);

module.exports = { addPlayer, removePlayer, getPlayer, getPlayersInRoom };