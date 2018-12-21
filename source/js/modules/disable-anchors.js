/**
 * Модуль, предотвращающий стандартное
 * поведение якорей-ссылок
 */

/**
 * Функция, предотвращающая стандартное
 * поведение якорей-ссылок
 *
 * @param {string} elements Элементы, которые надо исключить
 */
const disableEmptyAnchors = (...elements) => {
  const excludedElements = elements.map((item) => `:not(${item})`).join('');
  const emptyAnchors = document.querySelectorAll(`a[href="#"]${excludedElements}`);
  emptyAnchors.forEach((item) => {
    item.addEventListener('click', (evt) => evt.preventDefault());
  })
};

disableEmptyAnchors('.js-scroll-top');
