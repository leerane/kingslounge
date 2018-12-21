/**
 * Модуль анимации
 */

import './animations';

/**
 * Функция состояния завершенности анимации
 *
 * @callback draw
 * @param {number} progress
 */

/**
 * Временная функция
 *
 * @callback timing
 * @param {number} timeFraction
 */

/**
 * Функция анимации
 *
 * @param {draw} draw
 * @param {timing} timing
 * @param {number} duration Длительность анимации
 */
const animate = ({draw, timing = linear, duration = 1000}) => {
  const start = performance.now();

  // Request Animation
  const requestId = requestAnimationFrame(function animate(time) {

    // Состояние от 0 до 1
    let timeFraction = (time - start) / duration;

    // При небольшом превышении фиксируем конец
    if (timeFraction > 1) {
      timeFraction = 1;
      cancelAnimationFrame(requestId);
      return;
    }

    // Запоминаем текущий прогресс от 0 до 1 (значение временной функции)
    const progress = timing(timeFraction);
    draw(progress);

    if (timeFraction < duration) {
      requestAnimationFrame(animate)
    }
  });
};

export default animate;
