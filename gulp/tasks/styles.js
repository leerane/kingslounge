import gulp from 'gulp';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import cssnano from 'cssnano';
import plumber from 'gulp-plumber';
import autoprefixer from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import {PathName, FileName} from './utils';

/**
 * Модуль компиляции препроцессорных файлов
 */

const bs = browserSync.create();
const reload = bs.reload;

/**
 * Функция компиляции препроцессорных файлов
 *
 * @return {function()}
 */
const styles = () => {
  return gulp.src(PathName.SOURCE + PathName.SCSS + '/' + FileName.SCSS)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(PathName.BUILD + PathName.CSS))
    .pipe(postcss([cssnano({minifyFontWeight: false})]))
    .pipe(rename({
      suffix: '.min',
      extname: '.css'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(PathName.BUILD + PathName.CSS))
    .pipe(reload({stream: true}));
};

export {styles as default};
