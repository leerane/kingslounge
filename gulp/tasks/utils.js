/**
 * Модуль вспомогательных значений
 */

/**
 * Название файла
 *
 * @typedef {Object} FileName
 * @property {string} JS
 * @property {string} CSS
 * @property {string} SCSS
 * @property {string} LIBS
 * @property {string} CONFIG
 * @property {string} SPRITE
 * @property {string} LAST_ATTR
 * @property {string} ENTRY
 * @property {string} BUNDLE
 */
const FileName = {
  JS: 'main.js',
  CSS: 'styles.css',
  SCSS: 'styles.scss',
  LIBS: 'libs.js',
  CONFIG: '_config.scss',
  SPRITE: '_sprite.scss',
  LAST_ATTR: '_last-attr.scss',
  ENTRY: 'main.js',
  BUNDLE: 'bundle.js'
};

/**
 * Название пути
 *
 * @typedef {Object} PathName
 * @property {string} SOURCE
 * @property {string} BUILD
 * @property {string} PAGES
 * @property {string} PUG_PATTERN
 * @property {string} HTML_PATTERN
 * @property {string} SCSS
 * @property {string} SCSS_PATTERN
 * @property {string} _SCSS_PATTERN
 * @property {string} SCSS_FILE
 * @property {string} CSS
 * @property {string} JS
 * @property {string} JS_PATTERN
 * @property {string} JS_MODULES
 * @property {string} LIBS
 * @property {string} IMG
 * @property {string} IMG_PATTERN
 * @property {string} SVG
 * @property {string} SVG_PATTERN
 * @property {string} SPRITE
 * @property {string} _SPRITE_FILE
 * @property {string} BLOCKS
 * @property {string} UTILITY
 * @property {string} FONTS
 * @property {string} FONTS_PATTERN
 * @property {string} _LAST_ATTR_FILE
 * @property {string} _CONFIG_FILE
 * @property {string} GULP
 */
const PathName = {
  SOURCE: './source',
  BUILD: './build',
  PAGES: '/pages',
  PUG_PATTERN: '/**/!(_)*.pug',
  HTML_PATTERN: '/**/!(_)*.html',
  SCSS: '/sass',
  SCSS_PATTERN: '/**/*.{scss,sass}',
  _SCSS_PATTERN: '/**/_*.{scss,sass}',
  SCSS_FILE: '/' + FileName.SCSS,
  CSS: '/css',
  JS: '/js',
  JS_PATTERN: '/**/!(_)*.js',
  JS_MODULES: '/modules',
  LIBS: '/libs',
  IMG: '/img',
  IMG_PATTERN: '/**/*.{jpg,jpeg,png,gif}',
  SVG: '/svg',
  SVG_PATTERN: '/*.svg',
  SPRITE: '/sprite',
  _SPRITE_FILE: '/' + FileName.SPRITE,
  BLOCKS: '/blocks',
  UTILITY: '/utility',
  FONTS: '/fonts',
  FONTS_PATTERN: '/**/*.{woff,woff2}',
  _LAST_ATTR_FILE: '/' + FileName.LAST_ATTR,
  _CONFIG_FILE: '/' + FileName.CONFIG,
  GULP: './gulp'
};

export {FileName, PathName};
