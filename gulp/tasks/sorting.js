import gulp from 'gulp';
import postcss from 'gulp-postcss';
import sorting from 'postcss-sorting';
import parser from 'postcss-scss';
import config from '../../.postcss-sorting.json';
import {PathName} from './utils';

/**
 * Модуль копирования файлов
 */

/**
 * Функция сортировки "внутренностей" препроцессорных файлов
 *
 * @return {function()}
 */
const sortSASS = () => {
  return gulp.src(PathName.SOURCE + PathName.SCSS_PATTERN, {
    base: process.cwd()
  })
    .pipe(
        postcss([
          sorting(config)
        ], {syntax: parser})
    )
    .pipe(gulp.dest('./'));
};

export {sortSASS as default};
