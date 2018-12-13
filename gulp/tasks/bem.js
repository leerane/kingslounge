import gulp from 'gulp';
import * as gulpBemCss from 'gulp-bem-css';
import {PathName} from './utils';

/**
 * Модуль создания BEM папок
 */

/**
 * Функция создания папок и .scss файлов на основе BEM
 *
 * @return {function()}
 */
const bemToCss = () => {
  return gulp.src(PathName.SOURCE + PathName.HTML_PATTERN)
    .pipe(gulpBemCss({
      folder: PathName.SOURCE + PathName.SCSS + PathName.BLOCKS,
      extension: 'scss',
      elementSeparator: '__',
      modifierSeparator: '--'
    }))
    .pipe(gulp.dest(PathName.SOURCE));
};

export {bemToCss as default};
