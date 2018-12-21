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
   * @callback loadCallback
   * @callback downloadCallback
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
   * @param {loadCallback} load
   * @param {downloadCallback} download
   */
  constructor({method = 'GET', url, timeout = TIMEOUT, data = null, success, error, load, download}) {

    // Опции
    this.options = {method, url, timeout, data, success, error, load, download};

    const xhr = new XMLHttpRequest();

    // Если имеем POST запрос - используем XMLHttpRequestUpload
    if (this.options.method === 'POST') {

      // Timeout
      xhr.timeout = this.options.timeout;

      // Добавляем "предфункцию" на стадию загрузки
      xhr.addEventListener('progress', () => {
        this.options.load();
      });

      // Обработка ошибок до 4xx включительно
      xhr.addEventListener('load', () => {
        if (xhr.status === STATUS_CODE_DONE) {

          // Удаляем результат "предфункции"
          this.options.load.remove();

          // Ответ от сервера
          this.options.success(xhr.response);
        } else {
          this.options.error(`Номер ошибки: ${xhr.status}.`);
        }
      });

      // Ошибка "задержки"
      xhr.addEventListener('timeout', () => {
        this.options.error(`Запрос не успел выполниться за ${xhr.timeout}мс. Повторите попытку позже`);
      });

      // Ошибка соединения
      xhr.addEventListener('error', () =>  {
        this.options.error(`Произошла ошибка соединения ${xhr.status}. Повторите попытку позже`);
      });
    } else if (this.options.method === 'GET') {

      // Timeout
      xhr.timeout = this.options.timeout;

      // Устанавливаем (ограничиваем) тип получаемых данных и добавляем "предфункцию"
      xhr.responseType = 'json';
      xhr.addEventListener('progress', () => {
        this.options.download();
      });

      // Обработка ошибок до 4xx включительно
      xhr.addEventListener('load', () => {
        if (xhr.status === STATUS_CODE_DONE) {

          // Удаляем результат "предфункции"
          this.options.download.remove();

          // Ответ от сервера
          this.options.success(xhr.response);
        } else {
          this.options.error(`Номер ошибки: ${xhr.status}.`);
        }
      });

      // Ошибка "задержки"
      xhr.addEventListener('timeout', () => {
        this.options.error(`Запрос не успел выполниться за ${xhr.timeout}мс. Повторите попытку позже`);
      });

      // Ошибка соединения
      xhr.addEventListener('error', () =>  {
        this.options.error(`Произошла ошибка соединения ${xhr.status}. Повторите попытку позже`);
      });
    }

    // Открытие запроса
    xhr.open(method, url);

    // Отправка запроса
    xhr.send(data);
  }
}
