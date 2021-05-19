
export const flipCard = (state, action) => {
    const newState = { ...state }
    const { cards } = newState.board
    // Si ya hay una carta invertida, deshabilito todas
    const disableCards = cards.some(card => card.flip)

    cards.forEach((card) => {
      if (disableCards) card.disabled = true

      if (card.id === action.id) {
        card.flip = !card.flip;
        card.disabled = true;
      }

      return card;
    });
    
    return newState
};
