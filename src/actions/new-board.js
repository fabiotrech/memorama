
export const newBoard = (state) => {
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
};

const randomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
