import React, { Component } from 'react';
import Card from './components/card';
import './App.css';

class App extends Component {
	state = {
		scores: [0, 0],
		selected: {
			firstCard: null,
			secondCard: null
		},
		currentPlayer: 0,
		canSelect: true,
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
			return { value: s, show: false, visible: false}
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

	checkPoint() {
		let { firstCard, secondCard } = this.state.selected
		let isValid = this.validSelected()

		this.setState(state => {
			state.canSelect = true

			if (isValid) {
				// Increment score
				state.scores[state.currentPlayer] += 1
			} else {
				// Switch player
				state.currentPlayer = state.currentPlayer === 0 ? 1 : 0
			}
			
			return state.board.map(card => {
				if (card === firstCard || card === secondCard) {
					state.selected.firstCard = state.selected.secondCard = null

					if (isValid) {
						// La carta queda fuera de juego
						card.visible = false
					} else {
						// Oculto la carta para el siguiente player
						card.show = false
					}
				}

				return card
			})
		})
	}

	onCardClick(card) {
		if (!this.state.canSelect) return

		let delayCheck = () => {
			let { firstCard, secondCard } = this.state.selected
			if (!firstCard || !secondCard) return

			setTimeout(() => {
				this.checkPoint()
			}, 1500);
		}

		this.setState(state => {
			return state.board.map(item => {
				if (item === card) {
					item.show = !item.show

					if (!state.selected.firstCard) {
						state.selected.firstCard = item
					} else if (!state.selected.secondCard) {
						state.selected.secondCard = item
						// No puede seleccionar mas cartas
						state.canSelect = false
					}
				}

				return item
			})
		}, () => delayCheck())
	}

	render() {
		return (
			<div>
				<h1>Memorama</h1>
				<p>
					Scores: Player 1 ({this.state.scores[0]}) - Player 2 ({this.state.scores[1]})
				</p>

				<p>Curent player: Player {this.state.currentPlayer + 1}</p>

				{this.state.board.map((card, index) => 
					<Card key={index} data={card} onClick={e => this.onCardClick(card)} />
				)}
			</div>
		)
	}
}

export default App;
