import gulp from 'gulp';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import {PathName} from './utils';

/**
 * Модуль копирования HTML файлов
 */

const bs = browserSync.create();
const reload = bs.reload;

/**
 * Функция копирования HTML файлов
 *
 * @return {function()}
 */
const html = () => {
  return gulp.src(PathName.SOURCE + PathName.HTML_PATTERN)
    .pipe(plumber())
    .pipe(gulp.dest(PathName.BUILD))
    .pipe(reload({stream: true}));
};

export {html as default};
