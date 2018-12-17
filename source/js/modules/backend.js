/**
 * Модуль XHR
 */

// Вспомогательные переменные
const TIMEOUT = 7500;
const STATUS_CODE_DONE = 200;

/**
 * Класс, создающий XMLHttpRequest
 */
export default class Xhr {

  /**
   * @callback successCallback
   * @callback errorCallback
   */

  /**
   * Функция создания запроса
   *
   * @param {string} method
   * @param {string} url
   * @param {number} timeout
   * @param {*} data
   * @param {successCallback} success
   * @param {errorCallback} error
   */
  constructor({method = 'GET', url, timeout = TIMEOUT, data = null, success, error}) {

    // Опции
    this.options = {method, url, timeout, data, success, error};

    const xhr = new XMLHttpRequest();
    xhr.timeout = this.options.timeout;

    // Устанавливаем (ограничиваем) тип получаемых данных
    if (this.options.method === 'GET') {
      xhr.responseType = 'json';
    }

    // Обработка ошибок до 4xx включительно
    xhr.addEventListener('load', () => {
      if (xhr.status === STATUS_CODE_DONE) {
        this.options.success(xhr.response);
      } else {
        this.options.error(`Номер ошибки: ${xhr.status}.`);
      }
    });

    // Ошибка "задержки"
    xhr.addEventListener('timeout', () => {
      this.options.error(`Запрос не успел выполниться за ${xhr.timeout}мс.`);
    });

    // Ошибка соединения
    xhr.addEventListener('error', () =>  {
      this.options.error(`Произошла ошибка соединения ${xhr.status}.`);
    });

    // Открытие запроса
    xhr.open(method, url);

    // Отправка запроса
    xhr.send(data);
  }
}
