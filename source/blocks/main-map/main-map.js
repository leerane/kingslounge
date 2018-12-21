/**
 * Модуль Yandex.Карты
 */

let yMap;
const coords = [55.61766987853599, 37.511211690490725];
ymaps.ready(init);

/**
 * Функция инициализации карты
 */
function init() {
  // Создание карты.
  yMap = new ymaps.Map('main-map', {
    center: coords,
    zoom: 17
  }, {
    searchControlProvider: 'yandex#search'
  });

  kingsPlacemark = new ymaps.Placemark(coords, {
    hintContent: `King's Lounge`,
  }, {
    // Своё изображение иконки метки.
    iconLayout: 'default#image',
    iconImageHref: '../img/svg/map-pin.svg',
    iconImageSize: [66, 100],
    iconImageOffset: [-33, -90],
    draggable: true
  });

  yMap.geoObjects.add(kingsPlacemark);
}

