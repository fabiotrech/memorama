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
		board: [],
		endMessage: null
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
			return { value: s, show: false, enabled: true}
		})
	}

	shuffleArray(a) {
		let j, x, i

		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1))
			x = a[i]
			a[i] = a[j]
			a[j] = x
		}

		return a
	}

	validSelected() {
		return this.state.selected.firstCard.value === this.state.selected.secondCard.value
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
						card.enabled = false
					} else {
						// Oculto la carta para el siguiente player
						card.show = false
					}
				}

				return card
			})
		}, () => this.checkEndGame())
	}

	checkEndGame() {
		let hasCards = this.state.board.filter(card => card.enabled).length

		if (hasCards === 0) {
			let score1 = this.state.scores[0]
			let score2 = this.state.scores[1]
			let message = "¡Empate!"

			if (score1 > score2) message = "Jugador 1 gana!";
			if (score2 > score1) message = "Jugador 2 gana!";

			this.setState({
				endMessage: message
			})
		}
	}

	onCardClick(card) {
		if (!this.state.canSelect ||
			card === this.state.selected.firstCard ||
			!card.enabled) return

		let delayCheck = () => {
			let { firstCard, secondCard } = this.state.selected
			if (!firstCard || !secondCard) return

			setTimeout(() => this.checkPoint(), 1500);
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

	restartGame() {
		this.setState({
			scores: [0, 0],
			currentPlayer: 0,
			endMessage: null,
			board: this.getRandomBoard()
		})
	}

	render() {
		return (
			<div className="game-box">
				<div className="score-box">
					<p>
						Jugador 1: {this.state.scores[0]}
					</p>
					<p>
						Jugador 2: {this.state.scores[1]}
					</p>
				</div>

				<p className="player-turn">
					Turno del jugador {this.state.currentPlayer + 1}
				</p>

				<div className="board">
					{this.state.board.map((card, index) => 
						<Card key={index} data={card} onClick={() => this.onCardClick(card)} />
					)}
				</div>

				{this.state.endMessage && 
					<div className="endgame-box">
						<p>{this.state.endMessage}</p>
						<button onClick={() => this.restartGame()}>
							Jugar de nuevo
						</button>
					</div>
				}
			</div>
		)
	}
}

export default App;
