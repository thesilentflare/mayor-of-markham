let deck = [];
let discardStack1 = [];
let discardStack2 = [];
let playerQueue = [];
let sheriffIndex = 0;

const startGame = ({ rounds, players, socket, player }, io) => {
	if (players.length < 2) return { error: "Not enough players" };

	io.to(player.room).emit("message", {
		player: "admin",
		text: `Game Has Started`,
	});
	//socket.broadcast.to(player.room).emit("gameStart");
	//console.log(rounds);

	// Set starting currencies
	// populate player points
	playerQueue = players.map((players) => ({
		...players,
		points: 0,
	}));
	console.log(playerQueue);

	// populate card deck???

	// Main game LOOOP
	for (i = 1; i <= rounds; i++) {
		// Msg game round
		io.to(player.room).emit("message", {
			player: "admin",
			text: `Round ${i}`,
		});

		// If first round everyone draws 6 cards default

		//Msg you are sheriff to sheriff at round start
		io.to(playerQueue[sheriffIndex].id).emit("message", {
			player: "admin",
			text: `You Are the Sheriff this Round`,
		});

		// console.log(players);
		// somehow figure out how to msg wait to those that is not their turn

		// Loop tru merchant players
		for (j = 0; j < playerQueue.length; j++) {
			// Only merchant players
			if (j !== sheriffIndex) {
				// Discard Action
				io.to(playerQueue[j].id).emit("message", {
					player: "admin",
					text: "Discard",
				});
				// Draw Action
				// Place into bag Action
			}
		}

		// Start Check Phase
		// Check/not check Actions
		// Calculate

		// Set next Sheriff
		if (sheriffIndex === playerQueue.length - 1) {
			sheriffIndex = 0;
		} else {
			sheriffIndex++;
		}
	}

	// End of game
	// Calculate final counts
	// Send winner info

	return { player };
};

module.exports = {
	startGame,
};
