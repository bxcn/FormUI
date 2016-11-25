import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
const $ = gulpLoadPlugins();

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cached("images"))
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{
        cleanupIDs: false
      }]
    }))
    .pipe(gulp.dest('dist/images/'));
});

gulp.task('html', () => {
  gulp.src(['app/**/*.html'])
    .pipe(gulp.dest('dist/'));

});
gulp.task('js', () => {
  return gulp.src(['app/js/lib/*.js'])
    .pipe($.cached("js"))
    .pipe(gulp.dest('dist/js/lib/'));
});

gulp.task("seajs", () => {
  return gulp.src(['app/js/**/**.js', '!app/js/lib/*.js'])
    .pipe($.babel({
      "plugins": ["transform-es2015-modules-umd"]
    }))
    //.pipe($.seajs("app"))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('sass', () => {
  return gulp.src(['app/sass/**/*.scss'])
    .pipe($.sass())
    .pipe($.autoprefixer({
      browsers: ['> 5%', 'last 4 versions']
    }))
    .pipe(gulp.dest('dist/css/'));
});

// 重新加载
const reload = browserSync.reload;

gulp.task('serve', ['sass', 'js', 'images', 'html', 'seajs'], () => {
  browserSync({
      port: 900, //端口
      host: 'localhost',
      browser: ["chrome"], // 在chrome、firefix下打开该站点
      server: {
        baseDir: ['dist/'],
        index: 'index.html',
        routes: {
          '/bower_components': 'bower_components'
        }
      }
    })
  
  // 每当修改以下文件夹下的文件时就会刷新浏览器;
  gulp.watch('app/js/**/*.js', ['js','seajs']);
  gulp.watch('app/sass/**/*.scss', ['sass']);
  gulp.watch('app/images/**/*.{jpg,png,gif}', ['images']);
  gulp.watch('app/**/*.html', ['html']);

  gulp.watch([
    'app/**/*.*'
  ]).on('change', reload);
});

gulp.task('server', ['serve'], () => {});