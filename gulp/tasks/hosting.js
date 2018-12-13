import gulp from 'gulp';
import {build} from './build';
import rSync from 'gulp-rsync';

/**
 * Модуль публикации сайта на удаленный сервер
 */

const SSH = 'a259357_lee@leerane.ru';
const DESTINATION = 'httpdocs/';

/**
 * Функция публикации сайта на удаленный сервер
 *
 * @return {function()}
 */
const rsync = () => {
  return gulp.src('build/**')
    .pipe(rSync({
      root: 'build/',
      hostname: SSH,
      destination: DESTINATION,
      archive: true,
      silent: false,
      compress: true
    }));
};

const hosting = gulp.series(build, rsync);

export {hosting as default};
