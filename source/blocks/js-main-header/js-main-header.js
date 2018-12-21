/**
 * Модуль, осуществляющий фиксацию шапки при скролле
 */

/**
 * Функция фиксации шапки
 *
 * @param {string} header
 * @param {string} content
 * @param {string} logo
 */
const fixHeader = (header = '.js-main-header', content = '.main-content', logo = '.main-logo') => {
  return function () {
    const mainHeader = document.querySelector(header);
    const mainContent = document.querySelector(content);
    const mainLogo = document.querySelector(logo);
    const height = mainHeader.offsetHeight;

    if (window.pageYOffset >= height + 50) {
      mainHeader.classList.add('main-header--sticky');
      mainLogo.classList.add('main-logo--sticky');
      mainContent.style.paddingTop = `${height}px`;
    } else {
      mainHeader.classList.remove('main-header--sticky');
      mainLogo.classList.remove('main-logo--sticky');
      mainContent.style.paddingTop = 0;
    }
  }
};

window.addEventListener('scroll', fixHeader());
