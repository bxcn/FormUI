import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import path from 'path';
const $ = gulpLoadPlugins();

gulp.task("formUI", () => {
  gulp.src(['src/**/*.js'])
    .pipe($.babel({
      "presets": ["es2015"]
    }))
    .pipe($.concat('formUI.js'))
    .pipe($.umd({
      dependencies: function(file) {
        return [{
          name:"",
          amd:""
        }];
      },
      exports: function(file) {
        return '_exports';
      },
      namespace: function(file) {
        return 'formUI';
      },
      template: path.join(__dirname, 'umd/templates/formUI.js')
    }))
    .pipe(gulp.dest(''));
});

gulp.task('sass', () => {
  return gulp.src(['src/sass/**/*.scss'])
    .pipe($.sass())
    .pipe($.autoprefixer({
      browsers: ['> 5%', 'last 4 versions']
    }))
    .pipe(gulp.dest('css/'));
});

// 重新加载
const reload = browserSync.reload;

gulp.task('serve', ['sass', 'formUI'], () => {
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
  gulp.watch('src/**/*.js', ['formUI']);
  gulp.watch('src/sass/**/*.scss', ['sass']);

  gulp.watch([
    'app/**/*.*'
  ]).on('change', reload);
});

gulp.task('server', ['serve'], () => {});