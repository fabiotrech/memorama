
export const checkMatch = (state) => {
    const newState = { ...state }
    const { cards } = newState.board
    const flipped = cards.filter(c => c.flip)
    
    if (flipped.length === 2) {
      const [cardOne, cardTwo] = flipped
      
      if (cardOne.value === cardTwo.value) {
          cardOne.matched = cardTwo.matched = true
          cardOne.flip = cardTwo.flip = false
      }

      cards.forEach((card) => {
          card.flip = false
          card.disabled = false
      })

      return newState
    }
    
    return state
};
