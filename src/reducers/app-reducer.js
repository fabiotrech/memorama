import { checkMatch } from "../actions/check-match"
import { flipCard } from "../actions/flip-card"
import { newBoard } from "../actions/new-board"

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
  CHECK_MATCH: "check-match",
};

export function AppReducer(state, action) {
  switch (action.type) {
    case types.NEW_BOARD:
      return newBoard(state)
    case types.FLIP_CARD:
      return flipCard(state, action)
    case types.CHECK_MATCH:
      return checkMatch(state)
    default:
      return state;
  }
}
