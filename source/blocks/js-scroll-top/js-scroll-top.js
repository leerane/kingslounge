/**
 * Модуль, осуществляющий появление кнопки "наверх"
 */

/**
 * Функция scroll-top
 *
 * @param {string} header
 * @param {string} button
 */
const scrollToTop = (header = '.js-main-header', button = '.js-scroll-top') => {
  return function () {
    const mainHeader = document.querySelector(header);
    const scrollTopButton = document.querySelector(button);
    const height = mainHeader.offsetHeight;

    if (window.pageYOffset >= height + 100) {
      scrollTopButton.classList.add('main-page__js-scroll-top--active');
    } else {
      scrollTopButton.classList.remove('main-page__js-scroll-top--active');
    }
  }
};

window.addEventListener('scroll', scrollToTop());
