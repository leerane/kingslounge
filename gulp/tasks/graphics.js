import gulp from 'gulp';
import imageMin from 'gulp-imagemin';
import imageMinMozJpeg from 'imagemin-mozjpeg';
import imageMinWebP from 'imagemin-webp';
import rename from 'gulp-rename';
import cheerio from 'gulp-cheerio';
import svgSprite from 'gulp-svg-sprites';
import replace from 'gulp-replace';
import {PathName} from './utils';

/**
 * Модуль графики (сжатие, спрайт и т.д.)
 */

/**
 * Функция сжатия изображений
 *
 * @return {function()}
 */
const compress = () => {
  return gulp.src(PathName.SOURCE + PathName.IMG + PathName.IMG_PATTERN)
    .pipe(imageMin([
      imageMin.jpegtran({
        progressive: true
      }),
      imageMinMozJpeg({
        quality: 98
      }),
      imageMin.optipng({
        optimizationLevel: 3
      })
    ]))
    .pipe(gulp.dest(PathName.BUILD + PathName.IMG))
    .pipe(imageMin([
      imageMinWebP({
        quality: 98
      })
    ]))
    .pipe(rename({
      extname: '.webp'
    }))
    .pipe(gulp.dest(PathName.BUILD + PathName.IMG));
};

/**
 * Функция создания SVG спрайта
 *
 * @return {function()}
 */
const sprite = () => {
  return gulp.src(PathName.SOURCE + PathName.IMG + PathName.SVG + '/to-sprite' + PathName.SVG_PATTERN)
    .pipe(svgSprite({
      mode: 'symbols',
      svgPath: PathName.SOURCE + PathName.IMG + PathName.SVG + PathName.SPRITE,
      svg: {
        symbols: 'sprite.svg'
      },
      preview: false
    }))
    .pipe(cheerio({
      run: ($) => {
        const excludedElements = [
          '#pswp-arrow-left-icon',
          '#pswp-arrow-right-icon'
        ];
        const ElementsData = {
          G: excludedElements.map((el) => el + ' g'),
          PATH: excludedElements.map((el) => el + ' path'),
          STROKE: excludedElements.map((el) => el + ' [stroke]'),
          STYLE: excludedElements.map((el) => el + ' [style]')
        };
        $('symbol g').not(ElementsData.G.toString()).attr('fill', 'currentColor');
        $('symbol path').not(ElementsData.PATH.toString()).attr('fill', 'currentColor');
        $('symbol [stroke]').not(ElementsData.STROKE.toString()).attr('stroke', 'currentColor');
        $('symbol [style]').not(ElementsData.STYLE.toString()).attr('style', 'fill: currentColor');
        $('title').remove();
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(gulp.dest(PathName.BUILD + PathName.IMG + PathName.SVG));
};

export {compress, sprite};
