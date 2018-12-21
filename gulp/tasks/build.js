import gulp from 'gulp';
import clean from 'del';
import copy from './copy';
import {compress, sprite} from './graphics';
import html from './html';
import styles from './styles';
import {js, libs} from './scripts';
import {PathName} from './utils';


/**
 * Модуль сборки проекта
 */

/**
 * Функция очистки папки build
 *
 * @return {function()}
 */
const cleanup = () => {
  return clean(PathName.BUILD);
};

/**
 * Функция сборки проекта
 *
 * @return {function()}
 */
const build = gulp.series(copy, compress, sprite, html, styles, libs, js);

export {cleanup, build};
