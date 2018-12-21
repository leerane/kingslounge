import gulp from 'gulp';
import {cleanup, build} from './gulp/tasks/build';
import dev from './gulp/tasks/dev';
import sortSASS from './gulp/tasks/sorting';
import hosting from './gulp/tasks/hosting';
import zip from './gulp/tasks/zip';

/**
 * Основной файл
 */

gulp.task('build', build);
gulp.task('build:clean', cleanup);
gulp.task('dev', dev);
gulp.task('zip', zip);
gulp.task('sorting', sortSASS);
gulp.task('hosting', hosting);
