const { populateDeck, draw, discard } = require("./cards");

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
		money: 50,
		hand: [],
		inventory: [],
		bag: [],
	}));
	console.log(playerQueue);

	// populate card deck??? hasContra/hasRoyal options maybe??
	deck = populateDeck(true, true);

	// Main game LOOOP
	for (i = 1; i <= rounds; i++) {
		// Msg game round
		io.to(player.room).emit("message", {
			player: "admin",
			text: `Round ${i}`,
		});

		// If first round everyone draws 6 cards default
		for (j = 0; j < playerQueue.length; j++) {
			playerQueue[j].hand = draw(deck, 6);
		}

		console.log("p1 start hand", playerQueue[0].hand);
		console.log("p2 start hand", playerQueue[1].hand);

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
                // Discard only if not round 1
				if (i !== 1) {
					// Implement timer here
						// Discard Action
						io.to(playerQueue[j].id).emit("message", {
							player: "admin",
							text: "Discard",
						});
					
				}
				// Implement timer here
					// Draw Action
					io.to(playerQueue[j].id).emit("message", {
						player: "admin",
						text: "Draw",
					});
			
			}
			// Place into bag Action
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

const payTo = (toIndex, fromIndex, amount) =>{
    playerQueue[fromIndex].money = playerQueue[fromIndex].money - amount;
    playerQueue[toIndex].money = playerQueue[toIndex].money + amount;
};

module.exports = {
	startGame,
};
