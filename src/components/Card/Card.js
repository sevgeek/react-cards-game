import React from 'react'
import './Card.css'

const Card = ({ color, index, clickHandler, selected }) => {

	// Определяем возможность нажатия на карточку
	let style = selected
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