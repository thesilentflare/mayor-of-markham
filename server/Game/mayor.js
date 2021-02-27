const { populateDeck, draw, discard } = require("./cards");

const games = [];
//let deck = [];
// let discardStack1 = [];
// let discardStack2 = [];
// let playerQueue = [];
// let sheriffIndex = 0;
// let playerTurn = "";
// let currentRound = 1;

const startGame = ({ rounds, players, room }) => {
  if (players.length < 2) return { error: "Not enough players" };

  let playerQueue = players.map((players) => ({
    ...players,
    money: 50,
    hand: [],
    inventory: [],
    bag: [],
  }));
  let deck = populateDeck(true, true);
  let discardStack1 = [];
  let discardStack2 = [];
  let sheriffIndex = 0;
  let currPlayerTurnIndex = 1;
  let currentRound = 1;
  console.log("here");
  for (j = 0; j < playerQueue.length; j++) {
    playerQueue[j].hand = draw(deck, 6);
  }
  games.push({
    room,
    playerQueue,
    deck,
    discardStack1,
    discardStack2,
    sheriffIndex,
    currPlayerTurnIndex,
    currentRound,
    rounds,
  });
  //console.log("games", games);
  let game = games[games.length - 1];
  return { game };
};

// const startGame = ({ rounds, players, socket, player }, io) => {
//   if (players.length < 2) return { error: "Not enough players" };

//   io.to(player.room).emit("message", {
//     player: "admin",
//     text: `Game Has Started`,
//   });
//   //socket.broadcast.to(player.room).emit("gameStart");
//   //console.log(rounds);

//   // Set starting currencies
//   // populate player points
//   playerQueue = players.map((players) => ({
//     ...players,
//     money: 50,
//     hand: [],
//     inventory: [],
//     bag: [],
//   }));
//   console.log(playerQueue);

//   // populate card deck??? hasContra/hasRoyal options maybe??
//   deck = populateDeck(true, true);

//   // Main game LOOOP
//   for (i = 1; i <= rounds; i++) {
//     // Msg game round
//     io.to(player.room).emit("message", {
//       player: "admin",
//       text: `Round ${i}`,
//     });

//     // If first round everyone draws 6 cards default
//     for (j = 0; j < playerQueue.length; j++) {
//       playerQueue[j].hand = draw(deck, 6);
//     }

//     //console.log("p1 start hand", playerQueue[0].hand);
//     //console.log("p2 start hand", playerQueue[1].hand);

//     //Msg you are sheriff to sheriff at round start
//     io.to(playerQueue[sheriffIndex].id).emit("message", {
//       player: "admin",
//       text: `You Are the Sheriff this Round`,
//     });

//     // console.log(players);
//     // somehow figure out how to msg wait to those that is not their turn

//     // Loop tru merchant players
//     for (m = 0; m < playerQueue.length - 1; m++) {
//       console.log("player", m);
//       // Only merchant players
//       if (m !== sheriffIndex) {
//         // Discard Actions
//         io.to(playerQueue[m].id).emit("message", {
//           player: "admin",
//           text: "Your turn to Discard",
//         });

//         socket.on("discardSend", (hand, index, discardStack) => {
//           let newHand = discard(hand, index, discardStack);
//           socket.emit("updateHand", { newHand });
//         });

//         // Draw Actions

//         // Discard only if not round 1
//         // let discardActionReceived = false;
//         // if (i !== 1) {
//         // 	// Discard Action
//         // 	io.to(playerQueue[m].id).emit("message", {
//         // 		player: "admin",
//         // 		text: "Your turn to Discard",
//         // 	});
//         // 	// Implement timer here
//         // 	let timeleft = 30;
//         // 	socket.on("discardSend", (hand, index, discardStack) => {
//         // 		let newHand = discard(hand, index, discardStack);
//         // 		socket.emit("updateHand", { newHand });
//         // 	});
//         // 	// on end turn
//         // 	socket.on("discardFinished", () => {
//         // 		discardActionReceived = true;
//         // 	});
//         // 	var discardTimer = setInterval(() => {
//         // 		// update timer
//         // 		console.log("timer:", timeleft);
//         // 		console.log("m", m);
//         // 		console.log("pq", playerQueue[m]);
//         // 		io.to(playerQueue[m].room).emit("timerCount", timeleft);
//         // 		// on discardAction
//         // 		if (timeleft <= 0 || discardActionReceived) {
//         // 			if (!discardActionReceived) {
//         // 				io.to(playerQueue[m].id).emit("message", {
//         // 					player: "admin",
//         // 					text: "Ran Out of Time",
//         // 				});
//         // 				discardActionReceived = true;
//         // 			}
//         // 			clearInterval(discardTimer);
//         // 		}
//         // 		timeleft--;
//         // 	}, 1000);
//         // }
//         // // Implement timer here
//         // // Draw Action
//         // if (discardActionReceived) {
//         // 	io.to(playerQueue[m].id).emit("message", {
//         // 		player: "admin",
//         // 		text: "Draw",
//         // 	});
//         // }
//       }
//       // Place into bag Action
//     }

//     // Start Check Phase
//     // Check/not check Actions
//     // Calculate

//     // Set next Sheriff
//     if (sheriffIndex === playerQueue.length - 1) {
//       sheriffIndex = 0;
//     } else {
//       sheriffIndex++;
//     }
//   }

//   // End of game
//   // Calculate final counts
//   // Send winner info

//   return { player };
// };

const payTo = (toIndex, fromIndex, amount) => {
  playerQueue[fromIndex].money = playerQueue[fromIndex].money - amount;
  playerQueue[toIndex].money = playerQueue[toIndex].money + amount;
};

module.exports = {
  startGame,
};
