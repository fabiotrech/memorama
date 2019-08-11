import React from 'react';
import './card.css'

function Card(props) {
    let { value, show, enabled }  = props.data;
    let css = ["card"]

    if (show) css = [...css, "card-show"]
    if (!enabled) css = [...css, "card-disabled"]

    return (
        <div className={ css.join(" ") } onClick={() => props.onClick()}>
            {value}
        </div>
    )
}

export default Card
