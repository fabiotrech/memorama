import React, { Component } from 'react';
import './card.css'

class Card extends Component {
    render() {
        let { value, visible }  = this.props.data;

        return (
            <div className={ visible ? "card" : "card card-hidden" } onClick={() => this.props.onClick()}>
                {value}
            </div>
        )
    }
}

export default Card
