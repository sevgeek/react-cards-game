import React, { useState, useEffect } from 'react'
import './Dashboard.css'

// Import components
import Card from '../Card/Card'

// Import functions
import shuffleCards from '../../functions/index'

const Dashboard = ({ cardsArray, roundResultText, roundIncrement, endGameStatus }) => {

	/**
	 * State
	 * Исходные карточки
	 * В начале делаем случайную сортировку карточек, после методом формируем объекты карточек
	 */
	const [cards, setCards] = useState(shuffleCards(cardsArray).map((card, index) => (
		{
			color: card,
			index: index,
			selected: false,
		}
	)))

	/**
	 * State
	 * Выбранные пользователем карточки
	 */
	const [selectCards, setSelectCards] = useState([])

	/**
	 * Effect
	 * Проверка на окончание игры
	 */
	useEffect(() => {
		// Копируем массив карточек
		let cardsArray = cards

		// Находим выбранные
		const checkResulst = cardsArray.filter(card => card.selected === true)

		// Если количество выбранных совпадает с общим количеством всех карточек, значит игра завершена
		if (checkResulst.length === cards.length) {
			setTimeout(() => endGameStatus(), 500)
		}
	}, [cards, endGameStatus])


	/**
	 * Effect
	 * Проверка выбранных пользователем карточек
	 */
	useEffect(() => {
		/**
		 * Проверка длины массива выбранных пользователем карточек
		 * Необходима для исключения быстрого выбора карточек пользователем и наполнения массива тремя и более карточками
		 */
		if (selectCards.length === 2) {
			// Проверяем карточки на цвет
			if (selectCards[0].color === selectCards[1].color) {
				// ...ожидание
				setTimeout(() => {
					// Показываем сообщение об успехе
					roundResultText(true)

					// Сбрасываем пользовательский выбор карточек
					setSelectCards([])

					// Устанавливаем новый раунд
					roundIncrement()
				}, 500)
			} else {
				// ...ожидание
				setTimeout(() => {
					// Показываем сообщение об ошибке
					roundResultText(false)

					// Сбрасываем пользовательский выбор карточек
					setSelectCards([])

					// Получаем все карточки из состояния
					let cardsArray = cards

					/**
					 * Перебирая массив выбранных пользователем карточек,
					 * сбрасываем значение выбора у исходных карточек
					 */
					selectCards.forEach((item) => {
						item.selected = false
						cardsArray.splice(item.index, 1, item)
					})

					// Обновляем состояние исходных карточек
					setCards([
						...cardsArray
					])

					// Устанавливаем новый раунд
					roundIncrement()
				}, 500)
			}
		}
	}, [cards, roundResultText, roundIncrement, selectCards, setCards])

	/**
	 * @name handlerClickCard
	 * @description Обработчик выбора карточки
	 * @param {Object} e Synthetic event
	 */
	const handlerClickOnCard = (e) => {
		// Проверка выбранных элементов на максимальное количество элементов (не более двух)
		if (selectCards.length < 2) {
			// Получаем индекс выбранной карточки
			let index = parseInt(e.target.getAttribute('data-index'))

			// Получаем цвет выбранной карточки
			let color = e.target.getAttribute('data-color')

			// Устанавливаем значение выбора
			let selected = true

			// Получаем все карточки из состояния
			let cardsArray = cards

			// Обновляем выбранной карточке свойства
			let selectedCard = {
				...cards[index],
				selected
			}

			// Заменяем карточку из исходного массива на обновлённую карточку
			cardsArray.splice(index, 1, selectedCard)

			// Записываем новый массив карточек в состояние
			setCards([
				...cardsArray
			])

			// Записываем выбор пользователя в состояние
			setSelectCards([
				...selectCards, { index, color, selected }
			])
		}
	}

	return (
		<div className='cards'>
			{cards.map((card) =>
				<Card
					key={card.index}
					index={card.index}
					color={card.color}
					selected={card.selected}
					clickHandler={(e) => handlerClickOnCard(e)} />
			)}
		</div>
	)
}

export default Dashboard