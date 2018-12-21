/**
 * Модуль галереи (превью)
 */

import {render} from '../../js/modules/utils';
import Xhr from '../../js/modules/backend';
import {showErrorModal} from '../modal/modal'
import {loader} from '../loader/loader';

const ID = '152';
const AMOUNT = 6;
const ServerUrl = {
  POSTS: `http://leerane.mcdir.ru/wp-json/wp/v2/posts/${ID}`,
  PARENT: `http://leerane.mcdir.ru/wp-json/wp/v2/media?parent=${ID}`
};

/**
 * Функция создания узла фотографии
 *
 * @param {number} WIDTH
 * @param {number} WIDTH
 * @param {string} THUMB
 * @param {string} FULL
 * @param {number} INDEX
 * @return {Element}
 */
const renderImage = ({'media_details': {'width': WIDTH, 'height': HEIGHT, 'sizes': {
  'thumbnail': {'source_url': THUMB},
  'full': {'source_url': FULL}
}}}, INDEX) => {

  /**
   * @typedef {Object} Url
   * @property {string} THUMB
   * @property {string} FULL
   */

  /**
   * Данные фотографии
   *
   * @typedef {Object} ImageData
   * @property {number} WIDTH
   * @property {number} HEIGHT
   * @property {number} INDEX
   * @property {Url}
   */
  const ImageData = {
    WIDTH,
    HEIGHT,
    INDEX,
    Url: {
      THUMB,
      FULL
    }
  };

  // Шаблон разметки
  const template = `
  <li class='gallery__item'>
    <figure class='gallery__figure'>
        <a href='${ImageData.Url.FULL}' class='gallery__link' data-size='${ImageData.WIDTH}x${ImageData.HEIGHT}'>
            <img src='${ImageData.Url.THUMB}' class='gallery__image' itemprop='thumbnail' alt='Фотография ${ImageData.INDEX}' />
        </a>
        <figcaption itemprop='caption description' class='visually-hidden'></figcaption>
     </figure>
  </li>
  `;

  return render(template);
};

/**
 * Функция добавления на страницу фотографий
 *
 * @param {string} parent
 * @param {number} amount
 */
const appendImages = (parent = '.gallery__list', amount) => {
  return function (data) {
    let appendedImages = [];
    const photosFragment = document.createDocumentFragment();
    const parentElement = document.querySelector(parent);

    const filteredArray = [...data].filter((item, index) => index < amount);

    filteredArray.forEach((item, index) => {
      photosFragment.appendChild(renderImage(item, index));
      appendedImages.push(renderImage(item, index));
    });

    parentElement.appendChild(photosFragment);
  }
};


// Создаем запрос к фотографиям
const images = new Xhr({
  method: 'GET',
  url: ServerUrl.PARENT,
  timeout: 7500,
  success: appendImages('.gallery__list', AMOUNT),
  error: showErrorModal,
  download: loader('.gallery__list')
});

