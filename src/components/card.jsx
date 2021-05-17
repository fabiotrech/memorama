import React from "react";
import "./card.css";
import cardBack from "./card-back.jpg";

export function Card({ value, flip, disabled, onClick }) {
  const flipCss = flip ? "flip" : "";

  return (
    <button className={`card ${flipCss}`} disabled={disabled} onClick={onClick}>
      <div className="back">
        <img src={cardBack} alt="Card is backfaced" draggable="false" />
      </div>
      <div className="front">{value}</div>
    </button>
  );
}
