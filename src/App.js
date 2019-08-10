import React, { Component } from 'react';
import Card from './components/card';
import './App.css';

class App extends Component {
	state = {
		score: {
			playerOne: 0,
			playerTwo: 0
		},
		selected: {
			firstCard: null,
			secondCard: null
		},
		board: []
	}

	componentDidMount() {
		this.setState({
			board: this.getRandomBoard()
		})
	}

	getRandomBoard() {
		const letters = "abcdefghijabcdefghij"
		let split = letters.split("")
		
		return this.shuffleArray(split).map(s => {
			return { value: s, visible: false}
		})
	}

	shuffleArray(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}

	validSelected() {
		return this.state.selected.firstCard.value === this.state.selected.secondCard.value;
	}

	onCardClick(card) {
		
		this.setState(state => {
			return state.board.map(item => {
				if (item === card) {
					item.visible = !item.visible

					if (!state.selected.firstCard) {
						state.selected.firstCard = item
					} else if (!state.selected.secondCard) {
						state.selected.secondCard = item
					}
				}

				return item
			})
		})

	}

	render() {
		return (
			<div>
				<h1>Memorama</h1>

				{this.state.board.map((card, index) => 
					<Card key={index} data={card} onClick={e => this.onCardClick(card)} />
				)}
			</div>
		)
	}
}

export default App;
