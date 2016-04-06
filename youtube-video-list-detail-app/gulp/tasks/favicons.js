'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import browserSync from 'browser-sync';

gulp.task('favicons', function() {
    return gulp.src('app/*.ico')
        .pipe(changed('app/*.ico')) // Ignore unchanged files
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream({ once: true }));
});
