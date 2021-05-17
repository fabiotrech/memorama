import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Card } from "./card";
import { useStore } from "../hooks/store";
import { types } from "../reducers/app-reducer";
import "./board.css";

export function Board() {
  const { state, dispatch } = useStore();
  const boardRef = useRef();

  useEffect(() => {
    dispatch({ type: types.NEW_BOARD });
  }, [dispatch]);

  useLayoutEffect(() => {
    boardRef.current.style.setProperty("--board-columns", state.board.columns);
  });

  function handleCardClick(cardId) {
    dispatch({ type: types.FLIP_CARD, id: cardId });
  }

  const {
    board: { cards },
  } = state;

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
