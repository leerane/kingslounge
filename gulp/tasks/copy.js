import gulp from 'gulp';
import {PathName} from './utils';

/**
 * Модуль копирования файлов
 */

/**
 * Функция копирования файлов
 *
 * @return {function()}
 */
const copy = () => {
  return gulp.src([
    PathName.SOURCE + PathName.IMG + PathName.SVG + PathName.SVG_PATTERN,
    PathName.SOURCE + PathName.FONTS + PathName.FONTS_PATTERN
  ], {
    base: PathName.SOURCE
  })
    .pipe(gulp.dest(PathName.BUILD));
};

export {copy as default};
