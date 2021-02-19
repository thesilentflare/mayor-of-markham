const legalCards = [
	{ name: "Rice", value: 2, penalty: 2, type: "legal" },
	{ name: "Noodles", value: 3, penalty: 3, type: "legal" },
	{ name: "Tea", value: 3, penalty: 2, type: "legal" },
	{ name: "Chicken", value: 4, penalty: 2, type: "legal" },
];
const contrabandCards = [
	{ name: "MBook", value: 6, penalty: 4, type: "contraband" },
	{ name: "Steak Sandwich", value: 7, penalty: 4, type: "contraband" },
	{ name: "Osaka Sushi", value: 8, penalty: 4, type: "contraband" },
	{ name: "Bimmer X3", value: 9, penalty: 4, type: "contraband" },
];

const royalCards = [
	{ name: "Fried Rice", value: 4, penalty: 3, type: "royal" },
	{ name: "Chicken Rox", value: 6, penalty: 4, type: "royal" },
	{ name: "Pho", value: 6, penalty: 4, type: "royal" },
	{ name: "Ramen", value: 9, penalty: 5, type: "royal" },
	{ name: "Fruit Chill", value: 6, penalty: 4, type: "royal" },
	{ name: "Bubble Tea", value: 9, penalty: 5, type: "royal" },
	{ name: "Tuesday Special", value: 8, penalty: 4, type: "royal" },
	{ name: "Thursday Special", value: 8, penalty: 4, type: "royal" },
];

const populateDeck = (hasContra, hasRoyal) => {
	// add legal
	let deck = [
		...Array(48).fill(legalCards[0]),
		...Array(36).fill(legalCards[1]),
		...Array(36).fill(legalCards[2]),
		...Array(24).fill(legalCards[3]),
	];
	// add contraband
	if (hasContra) {
		deck.push(
			...Array(22).fill(contrabandCards[0]),
			...Array(21).fill(contrabandCards[1]),
			...Array(12).fill(contrabandCards[2]),
			...Array(5).fill(contrabandCards[3])
		);
	}

	// add royal
	if (hasRoyal) {
        deck.push(
			...Array(2).fill(royalCards[0]),
			...Array(2).fill(royalCards[1]),
			...Array(2).fill(royalCards[2]),
            ...Array(1).fill(royalCards[3]),
            ...Array(2).fill(royalCards[4]),
            ...Array(1).fill(royalCards[5]),
            ...Array(2).fill(royalCards[6]),
		);
	}

    // shuffle deck
    shuffledDeck = shuffleDeck(deck)

    // return the deck
	return shuffledDeck;
};

const shuffleDeck = (deck) =>{
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }

  return deck;
};


const draw = (deck, amount) => {
    let draws = [];
    for (var i = 1; i <= amount; i++){
        draws.push(deck.pop());
    }
    return draws;
};

const discard = (hand, index, discardStack) => {
    for (var i = 1; i <= amount; i++){
        discardStack.push(hand.pop(index));
    }
    return hand;
};
module.exports = {
    draw,
    populateDeck,
    discard,
};