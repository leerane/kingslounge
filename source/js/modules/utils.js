/**
 * Модуль вспомогательных функций и переменных
 */

// Вспомогательные переменные
const ESC_KEYCODE = 27;

/**
 * Функция, возвращающее слово в
 * соответствующем числе
 *
 * @param {number} number
 * @param {string[]} options
 * @return {string}
 * @example
 *
 * makePlural(5, ['комната', 'комнаты', 'комнат']);
 * // return 'комнат';
 */
const makePlural = (number, options) => {
  const firstDigit = number % 10;
  const secondDigit = Math.floor(number / 10) % 10;

  if (secondDigit !== 1) {
    if (firstDigit === 1) {
      return options[0];
    } else if ((firstDigit >= 2 && firstDigit <= 4)) {
      return options[1];
    }
    return options[2];
  }
  return options[2];
};

/**
 * Функция, проверяющая, есть ли
 * у элемента соответствующий родитель
 *
 * @param {Node} parent
 * @param {Node} element
 * @return {boolean}
 */
const checkParentNode = (parent, element) => {
  let isInside = false;
  while (element.parentNode) {
    if (element.parentNode === parent) {
      isInside = true;
      break;
    }
    element = element.parentNode;
  }
  return isInside;
};

/**
 * Функция, удаляющая определенных детей
 * родительского элемента
 *
 * @param {Node} parent
 * @param {Node} elements
 */
const removeChildren = (parent, elements) => {
  elements.forEach((item) => {
    parent.removeChild(item);
  });
};

/**
 * Любая функция
 *
 * @callback addedCallback
 */

/**
 * Функция, вызывающая
 * callback при нажатии ESC
 *
 * @param {Event} evt
 * @param {addedCallback} callback
 * @return {function()}
 */
const escPressHandler = (evt, callback) => {
  return (...args) => {
    if (evt.keyCode === ESC_KEYCODE) {
      callback(...args);
    }
  }
};

/**
 * @callback addedCallback
 */

/**
 * Функция, вызывающая
 * callback при клике вне элемента
 *
 * @param {Event} evt
 * @param {Element} element
 * @param {addedCallback} callback
 * @return {function()}
 */
const outsideClickHandler = (evt, element, callback) => {
  return (...args) => {
    const target = evt.target;
    if (target !== element && !checkParentNode(element, target)) {
      callback(...args);
    }
  }
};

/**
 * Функция, определяющая значения
 * top и left для элемента
 * относительно окна или страницы
 *
 * @param {Element} elem
 * @param {boolean} relative Относительно страницы (не экрана)
 * @return {Object}
 */
const getCoords = (elem, relative = true) => {
  const box = elem.getBoundingClientRect();

  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top = relative ? box.top + scrollTop - clientTop : box.top;
  const left = relative ? box.left + scrollLeft - clientLeft : box.left;

  return {
    top: top,
    left: left
  };
};

/**
 * Функция, изменяющая значение
 * "другого" поля на значение текущего
 *
 * @param {Element} current
 * @param {Element} opposite
 */
const changeValue = (current, opposite) => {
  opposite.value = current.value;
};

/**
 * Функция глубокого копирования свойств объектов
 *
 * @param {Object} targetObject
 * @param {Object} refObject
 * @return {Object}
 */
const deepCopy = (targetObject, refObject) => {
  for (let prop in targetObject) {
    if (targetObject.hasOwnProperty(prop)) {
      if (typeof targetObject[prop] === 'object') {
        targetObject[prop] = refObject[prop] ? deepCopy(targetObject[prop], refObject[prop]) : targetObject[prop];
      } else {
        targetObject[prop] = (refObject[prop] || typeof refObject[prop] === 'boolean')
          ? refObject[prop]
          : targetObject[prop];
      }
    }
  }
  return targetObject;
};

/**
 * Функция, возвращающая входящее
 * число, если оно в промежутке.
 * В противном случае возвращается
 * одна из заданных границ
 *
 * @param {number} number
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const conditionalRange = (number, min, max) => (number < min && min) || (number > max && max) || number;

/**
 * Функция нахождения тега в родителе
 *
 * @param {Element} parent
 * @param {string} tag
 * @return {Element}
 */
const findTag = (parent, tag) => {
  let tempElement;

  [...parent.children].forEach((item) => {
    if (item.tagName === tag) {
      tempElement = item;
    }
  });

  return tempElement;
};

/**
 * Функция перевода в неактивное состояние
 * элементов формы
 *
 * @param {Element} element Узел формы
 */
const disableFormChildren = (element) => {
  [...element.children].forEach((item) => {
    item.setAttribute('disabled', '');
  });
};

/**
 * Функция перевода в активное состояние
 * элементов формы
 *
 * @param {Element} element Узел формы
 */
const enableFormChildren = (element) => {
  [...element.children].forEach((item) => {
    item.removeAttribute('disabled');
  });
};

/**
 * @callback addedCallback
 */

/**
 * Функция устранения дребезга
 *
 * @param {addedCallback} callback
 * @param {number} delay Задержка
 * @return {function()}
 */
const debounce = (callback, delay) => {
  let timer = null;

  return function (...args) {

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => callback(...args), delay);
  };
};

/**
 * Функция рендеринга HTML разметки
 *
 * @param {string} html
 * @return {Object}
 */
const render = (html) => {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content;
};

/**
 * Функция скрытия скролла для элемента
 *
 * @param {string} str
 */
const changeOverflow = (str) => {
  const element = document.querySelector(str);
  const temp = element.style.overflow;
  element.style.overflow = temp && temp !== 'visible'
    ? 'visible'
    : 'hidden';
};

/**
 * Функция скрытия клика для элемента
 *
 * @param {string} str
 */
const changePointerEvents = (str) => {
  const element = document.querySelector(str);
  const temp = element.style.pointerEvents;
  element.style.pointerEvents = temp && temp !== 'auto'
    ? 'auto'
    : 'none';
};

export {
  makePlural,
  removeChildren,
  escPressHandler,
  outsideClickHandler,
  getCoords,
  changeValue,
  deepCopy,
  conditionalRange,
  findTag,
  disableFormChildren,
  enableFormChildren,
  debounce,
  render,
  changeOverflow,
  changePointerEvents
};

