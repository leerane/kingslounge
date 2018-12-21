/**
 * Модуль создания модального окна
 */

import {escPressHandler, outsideClickHandler} from '../../js/modules/utils';

// Названия (символы) приватных обработчиков
const overlayEscPressHandler = Symbol();
const overlayClickOutHandler = Symbol();
const closeButtonClickHandler = Symbol();


/**
 * Класс, создающий модальное окно
 */
class Modal {

  /**
   * @typedef {Object} Block
   * @property {boolean} ESC
   * @property {boolean} OUTSIDE
   * @property {string} BUTTON
   * @property {boolean} HIDE
   * @property {boolean} DELETE
   */

  /**
   * @typedef {Object} Close
   * @property {boolean} ESC
   * @property {boolean} OUTSIDE
   * @property {string} BUTTON
   * @property {boolean} HIDE
   * @property {boolean} DELETE
   */

  /**
   * Функция создания запроса
   *
   * @param {string} template Шаблон (для селектора)
   * @param {string} hiddenClass Класс, скрывающий оверлей (и, соответственно, весь блок)
   * @param {string} activeClass Класс, показывающий главный блок
   * @param {boolean} disableScroll Отключить или нет главный скролл
   * @param {Block}
   * @param {Close}
   */
  constructor({
    template = '',
    hiddenClass = '',
    activeClass = '',
    disableScroll = true,
    Block: {
      OVERLAY = '',
      MAIN = '',
      PARENT = ''
    },
    Close: {
      ESC = true,
      OUTSIDE = true,
      BUTTON = '',
      HIDE = false,
      DELETE = true
    }
  }) {
    this.options = {
      template,
      activeClass,
      hiddenClass,
      disableScroll,
      Block: {
        OVERLAY,
        MAIN,
        PARENT
      },
      Close: {
        ESC,
        OUTSIDE,
        BUTTON,
        HIDE,
        DELETE
      }};

    /**
     * Функция создания узла
     * модального окна
     *
     * @return {Element}
     */
    const create = () => {
      const tempTemplate = document.querySelector('#error');
      return tempTemplate.content.querySelector(this.options.Block.OVERLAY).cloneNode(true);
    };

    // Модальное окно (оверлей)
    this.overlay = this.options.template
      ? create()
      : document.querySelector(this.options.Block.OVERLAY);

    // Модальное окно (основной внутренний блок)
    this.main = this.overlay.querySelector(this.options.Block.MAIN);

    // Кнопка закрытия
    this.closeButton = this.options.Close.BUTTON
      ? this.overlay.querySelector(this.options.Close.BUTTON)
      : '';

    // Родительский блок
    this.parent = document.querySelector(this.options.Block.PARENT);
  }

  /**
   * Функция показа модального окна
   */
  show = () => {
    // Скролл
    document.body.style.overflow = this.options.disableScroll ? 'hidden' : 'visible';
    const modalFragment = document.createDocumentFragment();

    // Добавление узла или удаление 'невидимого' класса
    if (this.options.template) {
      modalFragment.appendChild(this.overlay);
      this.parent.appendChild(modalFragment);
      this.overlay.classList.remove(this.options.hiddenClass);
      this.overlay.classList.add(this.options.activeClass);
    } else {
      this.overlay.classList.add(this.options.activeClass);
      this.overlay.classList.remove(this.options.hiddenClass);
    }

    // Добавление обработчиков
    if (this.options.Close.ESC && this.overlay) {
      document.addEventListener('keydown', this[overlayEscPressHandler]);
    }
    if (this.options.Close.OUTSIDE && this.overlay) {
      document.addEventListener('mouseup', this[overlayClickOutHandler]);
    }
    if (this.closeButton && this.overlay) {
      this.closeButton.addEventListener('click', this[closeButtonClickHandler]);
    }
  };

  /**
   * Функция закрытия модального окна
   */
  close = () => {

    // Скролл
    document.body.style.overflow = this.options.disableScroll ? 'visible' : 'hidden';

    // Удаление узла
    if (this.options.Close.DELETE && this.options.template) {
      this.overlay.classList.remove(this.options.activeClass);
      this.parent.removeChild(this.overlay);
    }

    // Скрытие узла
    if (this.options.Close.HIDE && this.overlay) {
      this.overlay.classList.remove(this.options.activeClass);
      this.overlay.classList.add(this.options.hiddenClass);
    }

    // Удаление обработчиков
    if (this.options.Close.ESC && this.overlay) {
      document.removeEventListener('keydown', this[overlayEscPressHandler]);
    }
    if (this.options.Close.OUTSIDE && this.overlay) {
      document.removeEventListener('mouseup', this[overlayClickOutHandler]);
    }
    if (this.closeButton && this.overlay) {
      this.closeButton.removeEventListener('click', this[closeButtonClickHandler]);
    }
  };

  /**
   * Функция-обработчик, закрывающая
   * модальное окно при нажатии клавиши ESC
   *
   * @param {Event} evt
   */
  [overlayEscPressHandler] = (evt) => {
    escPressHandler(evt, this.close)();
  };

  /**
   * Функция-обработчик, закрывающая
   * модальное окно при нажатии (клике) извне
   *
   * @param {Event} evt
   */
  [overlayClickOutHandler] = (evt) =>  {
    outsideClickHandler(evt, this.main, this.close)();
  };

  /**
   * Функция-обработчик, закрывающая
   * модальное окно при нажатии на кнопку
   *
   * @param {Event} evt
   */
  [closeButtonClickHandler] = (evt) => {
    evt.preventDefault();
    this.close();
  };
}

const showErrorModal = () => {
  window.addEventListener('load', () => {
    const errorModal = new Modal({
      template: '#error',
      hiddenClass:'visually-hidden',
      activeClass: 'modal-overlay--open',
      disableScroll: true,
      Block: {
        OVERLAY: '.modal-overlay',
        MAIN: '.modal',
        PARENT: 'body'
      },
      Close: {
        ESC: true,
        OUTSIDE: true,
        BUTTON: '.modal__button',
        HIDE: false,
        DELETE: true
      }
    });

    errorModal.show();
  });
};

export {showErrorModal};


