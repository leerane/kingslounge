/**
 * Модуль закрытия бургера и навигации при ресайзе
 * и кликах по навигационным якорям
 */

const hamburgerButton = document.querySelector('.js-hamburger-button');
const navigation = document.querySelector('.js-dropdown-navigation');
const body = document.body;
const BREAKPOINT = '768';
const mediaQuery = window.matchMedia(`(min-width: ${BREAKPOINT}px)`);

/**
 * Функция закрытия бургера и навигации
 */
const closeNavigation = () => {
  hamburgerButton.classList.remove('hamburger-button--close');
  navigation.classList.remove('visually-hidden');
  navigation.classList.remove('main-navigation--active');
  body.style.overflow = 'visible';
  body.style.pointerEvents = 'auto';
};

/**
 * Функция закрытия бургера и навигации при ресайзе
 */
const showNavigation = () => {
  if (mediaQuery.matches) {
    if (navigation.classList.contains('main-navigation--active')) {
      closeNavigation();
    } else {
      navigation.classList.remove('visually-hidden');
    }
  }
};

/**
 * Функция закрытия бургера и навигации при якорях (клике)
 */
const closeAnchorsNavigation = () => {
  [...navigation.children].forEach((item) => {
    item.addEventListener('click', function () {
      if (!mediaQuery.matches) {
        closeNavigation();
        navigation.classList.add('visually-hidden');
      }
    });
  })
};

window.addEventListener('resize', showNavigation);

showNavigation();

closeAnchorsNavigation();
