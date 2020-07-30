import React from 'react'
import './Card.css'

/**
 * @name Card
 * @description Компонент карточки
 * @param {String} color Цвет карточки
 * @param {Number} index Индекс карточки
 * @param {Boolean} selected Статус карточки (выбрана или нет)
 * @param {CallableFunction} clickHandler Call-back функция реагирования на клик по карточке
 */
const Card = ({ color, index, selected, clickHandler }) => {

	// Определяем возможность нажатия на карточку
	const style = selected
		? { pointerEvents: 'none' }
		: null

	return (
		<div
			style={style}
			data-color={color}
			data-index={index}
			onClick={(e) => clickHandler(e)}
			className={!selected ? `card__item` : `card__item card__item-${color}`}
		></div >
	)
}

export default Card