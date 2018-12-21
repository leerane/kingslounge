/**
 * Модуль анимаций (временных функциий)
 */

/**
 * Функция преобразования в ease-out
 *
 * @param {function(*)} timing
 * @return {function(*): number}
 */
function makeEaseOut(timing) {
  return function(timeFraction) {
    return 1 - timing(1 - timeFraction);
  }
}

/**
 * Функция преобразования в ease-in-out
 *
 * @param {function(*)} timing
 * @returns {Function}
 */
function makeEaseInOut(timing) {
  return function(timeFraction) {
    if (timeFraction < .5)
      return timing(2 * timeFraction) / 2;
    else
      return (2 - timing(2 * (1 - timeFraction))) / 2;
  }
}

/**
 * В степени n
 *
 * @param {number} n
 * @return {function(*)}
 */
function nth(n) {
  /**
   * Функция возврата
   *
   * @param {number} timeFraction Непрерывно возрастающее число от 0 до 1
   */
  return function(timeFraction) {
    return Math.pow(timeFraction, n);
  }
}

/**
 * Линейная
 *
 * @param {number} timeFraction
 * @return {number}
 */
function linear(timeFraction) {
  return timeFraction;
}

/**
 * Дуга
 *
 * @param {number} timeFraction
 * @return {number}
 */
function arc(timeFraction) {
  return 1 - Math.sin(Math.acos(timeFraction));
}

/**
 * Back: стрельба из лука
 *
 * @param {number} x Коэффициент упругости
 * @return {function(*)}
 */
function oliver(x) {
  return function(timeFraction) {
    return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
  }
}

/**
 * Отскок
 *
 * @param {number} timeFraction
 * @returns {number}
 */
function bounce(timeFraction) {
  for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }
}

/**
 * Elastic (упругая)
 *
 * @param {number} x
 * @param timeFraction
 * @returns {number}
 */
function elastic(x, timeFraction) {
  return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
}

export {
  makeEaseInOut,
  makeEaseOut,
  nth,
  linear,
  arc,
  oliver,
  bounce,
  elastic
}
