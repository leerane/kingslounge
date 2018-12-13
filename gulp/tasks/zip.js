import gulp from 'gulp';
import gulpZip from 'gulp-zip';
import {build} from './build';
import {PathName} from './utils';

/**
 * Модуль сжатия проекта (zip и gzip)
 */

/**
 * Функция zip
 *
 * @return {function()}
 */
const toZip = () => {
  return gulp.src(PathName.BUILD + '/**', {base: PathName.BUILD})
    .pipe(gulpZip('build.zip'))
    .pipe(gulp.dest('./'));
};

const zip = gulp.series(build, toZip);

export {zip as default};
