/**
 * @name shuffleCards
 * @description Функция случайно сортировки элементов массива
 * @param {Array} array Исходный массив карточек
 * @returns Sort array
 */
export default function shuffleCards(array) {
	return array.sort(() => Math.random() - 0.5)
}