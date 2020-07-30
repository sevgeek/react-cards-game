import React, { useState } from 'react';
import './App.css';

// Import components
import Dashboard from './components/Dashboard/Dashboard'
import cardsArray from './components/Dashboard/array'

// Import functions
import shuffleCards from './functions/index'

function App() {
	// cardsArray.push(...cardsArray)

	/** State: состояние раунда. Его номер и результат */
	const [roundInfo, setRoundInfo] = useState({
		number: 0,
		result: undefined
	})

	/** State: состояние игры */
	const [gameStatus, setGameStatus] = useState(false)

	// Описание игры
	let gameDescription = <div>
		<h2>Описание игры</h2>
		<p>Перед вами доска с плитками 4 на 4.</p>
		<p>Каждые две плитки имеют одинаковый цвет. Сейчас каждая плитка закрыта от вас.</p>
		<p>Игровой процесс представляет собой последовательность раундов. В каждом раунде вы должны выбрать 2 плитки с одинаковым цветом, чтобы оставить их открытыми.</p>
		<p>Если выберите плитки с разным цветом, то они будут вновь закрыты и начнётся новый раунд.</p>
		<p>Игра считается законченой, когда будут открыты все плитки!</p>
	</div>

	/** Emoji object */
	const emoji = {
		thinkingFace: <i class='em em-thinking_face' ariaRole='presentation' ariaLabel='THINKING FACE'></i>,
		star: <i class='em em-star2' ariaRole='presentation' ariaLabel='GLOWING STAR'></i>,
		trophy: <i class='em em-trophy' ariaRole='presentation' ariaLabel='TROPHY'></i>,
		game: <i class='em em-game_die' ariaRole='presentation' ariaLabel='GAME DIE'></i>,
		thumbsUp: <i class='em em---1' ariaRole='presentation' ariaLabel='THUMBS UP SIGN'></i>,
		thumbsDown: <i class='em em--1' ariaRole='presentation' ariaLabel='THUMBS UP SIGN'></i>
	}

	// Приветственное сообщение
	const welcomeText = <React.Fragment><h1>Угадайте карточки... {emoji.thinkingFace}</h1>{gameDescription}</React.Fragment>


	// Результат игры
	let gameResult = ''
	gameStatus
		// Игра успешно завершена
		? gameResult = <React.Fragment><h1>Поздравляем! {emoji.trophy}</h1><h2><small>Вы справились всего лишь за {roundInfo.number} раундов!</small></h2></React.Fragment>
		: roundInfo.result === undefined
			// Игра только начнётся
			? gameResult = <h2>Начните игру! {emoji.game}</h2>
			: roundInfo.result
				// Раунд выигран!
				? gameResult = <h2>Отлично! {emoji.thumbsUp}</h2>
				// Раунд проигран
				: gameResult = <h2>К сожалению нет...{emoji.thumbsDown}</h2>

	return (
		<div className='App'>
			<div className='rules'>
				{welcomeText}
			</div>
			<div className='board'>
				{gameResult}
				{gameStatus
					? null
					: <Dashboard
						cardsArray={shuffleCards(cardsArray)}
						endGameStatus={() => setGameStatus(!gameStatus)}
						roundResultText={(text) => setRoundInfo({ ...roundInfo, result: text })}
						roundIncrement={() => setRoundInfo({ ...roundInfo, number: roundInfo.number + 1 })} />
				}
			</div>
		</div>
	);
}

export default App