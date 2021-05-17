export const initialState = {
  board: {
    columns: 4,
    rows: 3,
    cards: [],
  },
};

export const types = {
  NEW_BOARD: "new-board",
  FLIP_CARD: "flip-card",
};

export function AppReducer(state, action) {
  switch (action.type) {
    case types.NEW_BOARD:
      const {
        board: { rows, columns },
      } = state;

      const letters = "abcdefghij".split("");
      let cards = new Array(rows * columns);

      for (let index = 0; index < cards.length; index += 2) {
        const letterIndex = randomInteger(0, letters.length - 1);
        const value = letters[letterIndex];

        cards[index] = {
          id: `card${index}`,
          value,
        };

        cards[index + 1] = {
          id: `card${index + 1}`,
          value,
        };

        letters.splice(letterIndex, 1);
      }

      cards = cards.sort(() => Math.random() - 0.5);

      const newBoard = { ...state.board, cards };
      return { ...state, board: newBoard };
    case types.FLIP_CARD:
      const newCards = state.board.cards.map((card) => {
        if (card.id === action.id) {
          card.flip = !card.flip;
          card.disabled = true;
        }

        return card;
      });

      return { ...state, cards: newCards };
    default:
      return state;
  }
}

const randomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
