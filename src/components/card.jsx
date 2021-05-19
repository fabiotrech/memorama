import React from "react";
import "./card.css";
import cardBack from "./card-back.jpg";

export function Card({ value, flip, matched, disabled, onClick }) {
  const flipCss = flip || matched ? "flip" : "";

  const handleClick = () => {
    if (!flip && !matched && !disabled) onClick()
  }

  return (
    <button className={`card ${flipCss}`} disabled={disabled} onClick={handleClick}>
      <div className="back">
        <img src={cardBack} alt="Card is backfaced" draggable="false" />
      </div>
      <div className="front">{value}</div>
    </button>
  );
}
