/**
 * Модуль открытия (закрытия) бургера и навигации при клике на бургер
 */

import {changeOverflow, changePointerEvents} from '../../js/modules/utils';

const hamburgerButton = document.querySelector('.js-hamburger-button');

/**
 * Функция открытия (закрытия) бургера и навигации
 */
const toggleNavigation = () => {
  const navigation = document.querySelector('.js-dropdown-navigation');

  changeOverflow('body');
  changePointerEvents('body');

  hamburgerButton.classList.toggle('hamburger-button--close');
  navigation.classList.remove('visually-hidden');
  navigation.classList.toggle('main-navigation--active')
};

hamburgerButton.addEventListener('click', toggleNavigation);

