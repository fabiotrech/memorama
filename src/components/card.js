import React from 'react';
import './card.css'

function Card(props) {
    let { value, show }  = props.data;

    return (
        <div className={ show ? "card" : "card card-hidden" } onClick={() => props.onClick()}>
            {value}
        </div>
    )
}

export default Card
