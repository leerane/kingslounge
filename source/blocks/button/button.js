/**
 * Функция создания перспективы при наведении
 *
 * @param {String} str
 */
const makePerspective = (str) => {
  const html = document.documentElement;
  const item = document.querySelector(str);

  /**
   * Функция отслежки движения внутри элемента
   *
   * @param {Event} evt
   */
  const itemMoveHandler = (evt) => {

    // Получаем обычные координаты внури элемента
    let [x, y] = [evt.clientX - item.getBoundingClientRect().left, evt.clientY - item.getBoundingClientRect().top];


    // Смещение
    let [dx, dy] = [x - item.getBoundingClientRect().width/ 2, y - item.getBoundingClientRect().height / 2];

    console.log(dx, dy);
    // Вставляем переменные в CSS
    html.style.setProperty('--rx', `${dy/-2}deg`);
    html.style.setProperty('--ry', `${dx/10}deg`);
  };

  // Перспектива при движении
  item.addEventListener('mousemove', itemMoveHandler);

  // Перспектива при нажатии
  item.addEventListener('mousedown', () => {
    html.style.setProperty('--tz', `-25px`);
  });

  item.addEventListener('mouseup', () => {
    html.style.setProperty('--rx', 0);
    html.style.setProperty('--ry', 0);
    html.style.setProperty('--tz', 0);

    item.removeEventListener('mousemove', itemMoveHandler);
  });
};
