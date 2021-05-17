import React from "react";
import "./score.css";

export function Score({ score1, score2 }) {
  return (
    <div className="score">
      Jugador 1: {score1}
      Jugador 2: {score2}
    </div>
  );
}
