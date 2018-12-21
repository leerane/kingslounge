import gulp from 'gulp';
import * as gulpPug from 'gulp-pug';
import {PathName} from './utils';
import browserSync from 'browser-sync';

/**
 * Модуль компиляции PUG файлов
 */

const bs = browserSync.create();
const reload = bs.reload;

/**
 * Функция компиляции PUG файлов
 *
 * @return {function()}
 */
const pug = () => {
  return gulp.src(PathName.SOURCE + PathName.PUG_PATTERN, {since: gulp.lastRun('pug')})
    .pipe(gulpPug({pretty: true}))
    .pipe(gulp.dest(PathName.BUILD))
    .pipe(reload({stream: true}));
};

export {pug as default};
