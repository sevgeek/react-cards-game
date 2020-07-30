/**
 * @name shuffleCards
 * @description Функция случайно сортировки элементов массива. Так же увеличиваем массив в два раза.
 * @param {Array} array Исходный массив карточек
 * @returns Sort array
 */
const shuffleCards = array => array.concat(array).sort(() => Math.random() - 0.5)

export default shuffleCards