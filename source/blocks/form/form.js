import Xhr from '../../js/modules/backend';
import {render} from '../../js/modules/utils';
import animate from '../../js/modules/animate';
import {nth} from '../../js/modules/animations';
import {showErrorModal} from '../modal/modal';
import {loader} from '../loader/loader';

/**
 * Модуль формы
 */

// Константы
const INVALID_FIELD_CLASS = 'input__control--invalid';
const ServerUrl = {
  MAIL: `http://kingslounge.ru/mail.php`
};

// Переменные, связанные с формами
const bookingForm = document.querySelector('.booking__form');
const bookingFormInitials = bookingForm.querySelector('#initials-field');
const bookingFormPhone = bookingForm.querySelector('#phone-field');
const bookingFormButton = bookingForm.querySelector('.form__button');

/**
 * Функция, проверяющая
 * количество введенных символов
 *
 * @param {Event} evt
 */
const checkLength = (evt) => {
  const target = evt.target;
  const inputSymbolsMessage = '. Введено символов: ' + target.value.length;

  if (target.validity.tooShort) {
    target.setCustomValidity('Минимальное количество символов: ' + target.minLength + inputSymbolsMessage);
  } else if (target.validity.tooLong) {
    target.setCustomValidity('Максимальное количество символов: ' + target.maxLength + inputSymbolsMessage);
  } else {
    target.setCustomValidity('');
  }
};

/**
 * Функция-обработчик валидации поля ФИО
 *
 * @param {Event} evt
 */
const initialsInputHandler = (evt) => {
  checkLength(evt);
};

/**
 * Функция-обработчик валидации телефона
 *
 * @param {Event} evt
 */
const phoneInputHandler = (evt) => {
  const target = evt.target;
};

/**
 * Функция, которая подсвечивает невалидное поле формы
 *
 * @param {Element} field
 */
const highlightInvalidField = (field) => {
  field.classList.add(INVALID_FIELD_CLASS);
};

/**
 * Функция, которая убирает подсветку
 * невалидного поля формы
 *
 * @param {Element} field
 */
const unHighlightInvalidField = (field) => {
  field.classList.remove(INVALID_FIELD_CLASS);
};

/**
 * Функция, отмечающая валидное
 * или невалидное поле
 *
 * @param {Element} field
 */
const checkFieldValidity = (field) => {
  if (!field.validity.valid) {
    highlightInvalidField(field);
  } else {
    unHighlightInvalidField(field);
  }
};

/**
 * Функция-обработчик, осуществляющая
 * 'отметку' невалидных полей
 *
 * @param {Event} evt
 */
const formInvalidHandler = (evt) => {
  const field = evt.target;
  checkFieldValidity(field);

  // Проверяем каждое поле при событии 'change'
  field.addEventListener('change', function () {
    checkFieldValidity(field);
  });
};


/**
 * Функция добавления обработчиков
 * на элементы формы объявления
 */
const addEventListeners = () => {
  // Валидация ФИО
  bookingFormInitials.addEventListener('input', initialsInputHandler);
  // Валидация телефона
  bookingFormPhone.addEventListener('input', phoneInputHandler);
  // Валидация полей (добавление и удаление красной рамки)
  bookingForm.addEventListener('invalid', formInvalidHandler, true);
};

/**
 * Функция удаления обработчиков
 * с элементов формы объявления
 */
const removeEventListeners = () => {
  // Валидация ФИО
  bookingFormInitials.removeEventListener('input', initialsInputHandler);
  // Валидация телефона
  bookingFormPhone.removeEventListener('input', phoneInputHandler);
  // Валидация полей (добавление и удаление красной рамки)
  bookingForm.removeEventListener('invalid', formInvalidHandler, true);
};

/**
 * Функция удаления красных подсветок
 * при очистке формы
 *
 * @param {Element} element Родитель
 * @param {string} invalidClass
 */
const deleteHighlight = (element, invalidClass) => {
  [...element.querySelectorAll(`.${invalidClass}`)].forEach((item) => {
    item.classList.remove(INVALID_FIELD_CLASS);
  });
};

/**
 * Функция очистки формы
 */
const resetBookingForm = () => {
  // Ресет формы
  bookingForm.reset();
  // Удаляем красные рамки
  deleteHighlight(bookingForm, INVALID_FIELD_CLASS);
};

/**
 * Функция активации формы объявления
 */
const activateBookingForm = () => {
  // Добавление всех обработчиков
  addEventListeners();
};

/**
 * Функция активации формы объявления
 */
const deactivateBookingForm = () => {
  // Очистка формы
  resetBookingForm();
};

/**
 * Функция загрузки
 *
 * @param {string} str
 * @param {string} parent
 */
const showMessage = (str, parent) => {
  return function () {
    const parentElement = document.querySelector(parent);

    // Шаблон текста
    const template = `
    <p class="form__result-text">${str}</p>
  `;

    // Вставляем текст в разметку
    parentElement.appendChild(render(template));

    const appendedText = parentElement.querySelector('.form__result-text');

    // Анимационная функция
    animate({
      draw: function (progress) {
        return appendedText.style.opacity = 1 - progress;
      },
      timing: nth(5),
      duration: 2000
    });

    // Удаляем текст о загрузке и возвращаем кнопку
    setTimeout(() => {
      parentElement.removeChild(appendedText);
      bookingFormButton.style.display = 'block';
    }, 2000);
  }
};

/**
 * Предфункция загрузки на сервер
 */
const upload = () => {

  // Скрываем кнопку и добавляем лоадер (три точки)
  bookingFormButton.style.display = 'none';
  return loader('.booking__form');
};

/**
 * Функция-обработчик, осуществляющая
 * отправку формы на сервер и вызов callback
 *
 * @param {Event} evt
 */
const bookingFormSubmitHandler = (evt) => {
  evt.preventDefault();
  const formData = new FormData(bookingForm);

  // Создаем запрос к серверу
  const bookingData = new Xhr({
    method: 'POST',
    url: ServerUrl.MAIL,
    timeout: 7500,
    data: formData,
    success: showMessage('Письмо отправлено!', '.booking__form'),
    error:  showMessage('Возникла ошибка! Повторите попытку позже', '.booking__form'),
    load: upload()
  });
};

// Активация формы и отправка
activateBookingForm();

bookingForm.addEventListener('submit', bookingFormSubmitHandler);
