import gulp from 'gulp';
import html from './html';
import styles from './styles';
import {js} from './scripts';
import {PathName} from './utils';
import browserSync from 'browser-sync';

/**
 * Модуль Watch
 */

const bs = browserSync.create();
const reload = bs.reload;

/**
 * Функция Watch
 */
const watch = () => {
  gulp.watch(PathName.SOURCE + PathName.SCSS_PATTERN, styles).on('change', reload);
  gulp.watch([PathName.GULP + PathName.JS_PATTERN, PathName.SOURCE + PathName.JS_PATTERN], gulp.series(js)).on('change', reload);
  gulp.watch(PathName.SOURCE + PathName.HTML_PATTERN, html).on('change', reload);
};

export {watch as default};
