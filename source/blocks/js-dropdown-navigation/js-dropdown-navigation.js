'use strict';

const navigation = document.querySelector('.js-dropdown-navigation');
const BREAKPOINT = '768';

if (window.matchMedia(`(min-width: ${BREAKPOINT}px`)) {
  navigation.classList.remove('visually-hidden');
} else {
  navigation.classList.add('visually-hidden');
}
