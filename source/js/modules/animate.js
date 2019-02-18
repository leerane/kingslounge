/**
 * Модуль анимации
 */

/**
 * Класс, создающий анимация
 */
class Animate {

  /**
   * Функция отрисовки анимации
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
   * Функция завершения анимации (опционально)
   *
   * @callback endFunction
   */

  /**
   * Функция-конструктор
   *
   * @param {draw} draw
   * @param {timing} timing
   * @param {endFunction} endFunction
   * @param {number} duration
   * @param {number} delay
   */
  constructor({draw, timing = linear, endFunction = null, duration = 2000, delay = 0}) {

    /**
     * Временные функции
     *
     * @typedef {Object} timingFunctionsMap
     * @property {function(number): function(number): number} nth
     * @property {function(number): number} linear
     * @property {function(number): number} arc
     * @property {function(number): function(number): number} oliver
     * @property {function(number): number} bounce
     * @property {function(number, number): number} elastic
     * @property {function(function(*)): function(number): number} easeOut
     * @property {function(function(*)): function(number): number} easeInOut
     */
    const timingFunctionsMap = {
      'nth': (n) => (timeFraction) => Math.pow(timeFraction, n),
      'linear': (timeFraction) => timeFraction,
      'arc': (timeFraction) => 1 - Math.sin(Math.acos(timeFraction)),
      'oliver': (x) => (timeFraction) => Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x),
      'bounce': (timeFraction) => {
        for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
          if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
          }
        }
      },
      'elastic': (x, timeFraction) => Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction),
      'easeOut': (timing) => (timeFraction) =>  1 - timing(1 - timeFraction),
      'easeInOut': (timing) => {
        return (timeFraction) => {
          if (timeFraction < .5)
            return timing(2 * timeFraction) / 2;
          else
            return (2 - timing(2 * (1 - timeFraction))) / 2;
        }
      },
    };

    // Переменные
    this.draw = draw;
    this.timing = timing;
    this.endFunction = endFunction;
    this.duration = duration;
    this.delay = delay;
    this.startTime = 0;
    this.pausedTime = 0;
    this.requestId = 0;
    this.isPaused = false;
    this.isStopped = false;

    /**
     * Основная функция для requestAnimationFrame
     *
     * @param {number} time
     */
    this.animate = (time) => {

      // Переменные прогресса и времени
      let progress = 0;
      let timeFraction = (time - this.startTime) / this.duration + this.pausedTime;

      // Если время превышено - прерываем анимацию
      if (timeFraction > 1) {
        timeFraction = 1;
        cancelAnimationFrame(this.requestId);
        return;
      }

      // Если есть "стоп" анимации
      if (this.isStopped) {
        timeFraction = 1;
        progress = this.timing(timeFraction);
        this.draw(progress);
        cancelAnimationFrame(this.requestId);
        return;
      }

      // Если анимация закончена и есть end-функция
      if (timeFraction === 1 && this.endFunction) {
        this.endFunction();
      }

      // Если используем встроенные временные функции
      if (typeof this.timing === 'string') {
        this.timing = timingFunctionsMap[this.timing];
      }

      // Если пауза - запоминаем момент
      if (this.isPaused) {
        this.pausedTime = timeFraction;
        cancelAnimationFrame(this.requestId);
        return;
      }

      // Если время еще есть и не на паузе - продолжаем анимацию
      if (timeFraction < 1 && !this.isPaused) {
        requestAnimationFrame(this.animate);
      }

      // Рисуем анимацию
      progress = this.timing(timeFraction);
      this.draw(progress);
    }
  }


  /**
   * Функция старта анимации
   */
  start() {

    // Начальное время
    this.startTime = performance.now();

    // Обнуляем время паузы
    this.pausedTime = 0;

    // Убираем паузу и "стоп"
    this.isPaused = false;
    this.isStopped = false;

    // Фрейм
    if (this.delay) {
      setTimeout(() => {
        this.requestId = requestAnimationFrame(this.animate);
      }, this.delay)
    } else {
      this.requestId = requestAnimationFrame(this.animate);
    }
  }

  /**
   * Функция паузы анимации
   */
  pause() {

    // Ставим на паузу
    this.isPaused = true;
  }

  /**
   * Функция остановки анимации
   */
  stop() {

    // Убираем паузу и останавливаем анимацию
    this.isPaused = false;
    this.isStopped = true;

    // Начальное время
    this.startTime = performance.now();

    // Фрейм
    this.requestId = requestAnimationFrame(this.animate);
  }

  /**
   * Функция продолжения анимации
   */
  continue() {

    // Убираем паузу и продолжаем анимацию
    this.isPaused = false;

    // Начальное время
    this.startTime = performance.now();

    // Фрейм
    this.requestId = requestAnimationFrame(this.animate);
  }
}

export default Animate;
