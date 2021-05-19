import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Card } from "./card";
import { useStore } from "../hooks/store";
import { types } from "../reducers/app-reducer";
import "./board.css";

export function Board() {
  const { state, dispatch } = useStore();
  const boardRef = useRef();

  const {
    board: { cards, columns },
  } = state;

  useEffect(() => {
    dispatch({ type: types.NEW_BOARD });
  }, [dispatch]);

  useLayoutEffect(() => {
    boardRef.current.style.setProperty("--board-columns", columns);
  });

  function handleCardClick(cardId) {
    dispatch({ type: types.FLIP_CARD, id: cardId });
  }

  const flipped = cards.filter(card => card.flip)
  const checkMatch = () => dispatch({ type: types.CHECK_MATCH })
  
  if (flipped.length === 2) {
    setTimeout(() => checkMatch(), 1500)
  }

  return (
    <div ref={boardRef} className="board">
      {cards.map((card) => (
        <Card
          key={card.id}
          {...card}
          onClick={() => handleCardClick(card.id)}
        />
      ))}
    </div>
  );
}
