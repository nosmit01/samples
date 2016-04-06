'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import browserSync from 'browser-sync';
import concat      from 'gulp-concat';

gulp.task('vendors', function() {
    return gulp.src(config.vendors.src)
        .pipe(changed(config.vendors.dest)) // Ignore unchanged files
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(config.vendors.dest))
        .pipe(browserSync.stream({ once: true }));
});
