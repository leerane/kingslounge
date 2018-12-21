/**
 * Модуль плавного скролла
 */

import {getCoords} from './utils';
import {makeEaseInOut, nth} from './animations';
import animate from './animate';

/**
 * Функция плавного скролла
 *
 * @param {Element} item
 * @param {number} duration
 * @param {function(*)} timing
 * @param {string} header Селектор шапки
 */
const smoothScroll = (item, duration = 2000, timing, header = '.js-main-header') => {
  return function () {

    // Высота фиксированной шапки
    let mainHeader;
    let mainHeaderHeight;

    try {
      mainHeader = document.querySelector(header);
      mainHeaderHeight = mainHeader.offsetHeight;
    } catch (e) {
      mainHeader = 0;
      mainHeaderHeight = mainHeader;
    }

    // Находим цель
    let refTarget;
    let endPoint;

    try {
      refTarget = document.querySelector(item.getAttribute('href'));
      endPoint = getCoords(refTarget).top
    } catch (e) {
      refTarget = 0;
      endPoint = refTarget;
    }


    /**
     * Координаты
     *
     * @typedef {Object} Position
     * @property {number} START
     * @property {number} END
     */
    const Position = {
      START: pageYOffset,
      END: endPoint,
      HEADER: mainHeaderHeight
    };

    // Анимационная функция
    animate({
      draw: function (progress) {
        return window.scrollTo(0, (Position.END - Position.START - Position.HEADER) * progress + Position.START);
      },
      timing: timing,
      duration: duration
    })
  }
};

/**
 * Функция добавления плавного скролла на все якоря
 *
 * @param {string} elements Дополнительные элементы
 */
const appendSmooth = (...elements) => {

  // Берем все якоря
  const additionalElements = elements.join(', ');
  const anchors = document.querySelectorAll(`a[href*="#"]:not([href="#"]):not([href="#0"]), ${additionalElements}`);

  anchors.forEach((item) => {
    item.addEventListener('click', smoothScroll(item, 600, makeEaseInOut(nth(2))));
  })
};

appendSmooth('.js-scroll-top');
