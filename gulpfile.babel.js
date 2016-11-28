import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import child_process from 'child_process';
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
    .pipe(gulp.dest('images/'));
});

gulp.task('html', () => {
  gulp.src(['app/**/*.html'])
    .pipe(gulp.dest(''));

});
gulp.task('js', () => {
  return gulp.src(['app/js/lib/*.js'])
    .pipe($.cached("js"))
    .pipe(gulp.dest('js/lib/'));
});

gulp.task("requirejs", () => {
  gulp.src(['app/js/**/**.js', '!app/js/lib/*.js'])
    .pipe($.babel({
      "presets": ["es2015"]
    }))
    .pipe(gulp.dest('js/'));

  const exec = child_process.exec;
  const free = exec('node r.js -o config.require.js');
  free.stdout.on('data', function(data) {
    console.log('标准输出：\n' + data);
  });
});

gulp.task('sass', () => {
  return gulp.src(['app/sass/**/*.scss'])
    .pipe($.sass())
    .pipe($.autoprefixer({
      browsers: ['> 5%', 'last 4 versions']
    }))
    .pipe(gulp.dest('css/'));
});

// 重新加载
const reload = browserSync.reload;

gulp.task('serve', ['sass', 'js', 'images', 'html', 'requirejs'], () => {
  browserSync({
    port: 900, //端口
    host: 'localhost',
    browser: ["chrome"], // 在chrome、firefix下打开该站点
    server: {
      baseDir: [''],
      index: 'index.html',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  })

  // 每当修改以下文件夹下的文件时就会刷新浏览器;
  gulp.watch('app/js/**/*.js', ['js', 'requirejs']);
  gulp.watch('app/sass/**/*.scss', ['sass']);
  gulp.watch('app/images/**/*.{jpg,png,gif}', ['images']);
  gulp.watch('app/**/*.html', ['html']);

  gulp.watch([
    'app/**/*.*'
  ]).on('change', reload);
});

gulp.task('server', ['serve'], () => {});