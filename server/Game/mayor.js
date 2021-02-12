const deck = [];
const discardStack1 = [];
const discardStack2 = [];
const playerQueue = [];
const sheriff = "";

const startGame = ({ rounds, players, socket, player }, io) => {
	if (players.length < 2) return { error: "Not enough players" };

	io.to(player.room).emit("message", {
		player: "admin",
		text: `Game Has Started`,
	});
	//socket.broadcast.to(player.room).emit("gameStart");
	//console.log(rounds);

	// Main game LOOOP
	for (i = 1; i <= rounds; i++) {
		io.to(player.room).emit("message", {
			player: "admin",
			text: `Round ${i}`,
		});
        
        // Set starting currencies
        // Set sheriff
        // Set turn order order

        // Loop tru merchant players
            // Discard Action
            // Draw Action
            // Place into bag Action
            // Start Check Phase
                // Check/not check Actions
            // Calculate
            // Set next Sheriff


	}

    // End of game
    // Calculate final counts
    // Send winner info

	return { player };
};


module.exports = {
	startGame,
};
