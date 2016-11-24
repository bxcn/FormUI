import gulp from 'gulp';
import $ from 'gulp-load-plugins';
import browserSync from 'browser-sync';

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
  return gulp.src(['app/js/**/*.js'])
    .pipe($.cached("js"))
    .pipe($.babel())
    .pipe(gulp.dest('dist/js/'));
});

gulp.task("seajs", () => {
  return gulp.src(['app/js/app.js'])
    .pipe($.seajs("app"))
    .pipe($.babel())
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('sass', () => {
  const timer = +(new Date());
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
      port: 800, //端口
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
  gulp.watch('app//js/**/*.js', ['js']);
  gulp.watch('app//sass/**/*.scss', ['sass']);
  gulp.watch('app//images/**/*.{jpg,png,gif}', ['images']);
  gulp.watch('app/**/*.html', ['html']);

  gulp.watch([
    'app/**/*.*'
  ]).on('change', reload);
});

gulp.task('server', ['serve'], () => {});