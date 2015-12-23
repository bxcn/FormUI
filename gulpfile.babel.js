// generated on 2015-11-17 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('uglify',  () => {
  return gulp.src(['app/js/lib/*.js'])
    .pipe(gulp.dest('./dist/js/lib/'))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.js', $.rename({extname: ".min.js"})))
    .pipe(gulp.dest('./dist/js/min/'))
    .pipe(reload({stream: true}));
});

gulp.task('sass',  () => {
  return gulp.src(['app/sass/**/*.scss'])
    .pipe($.if('*.scss', $.sass.sync({
        outputStyle: 'compact', //输出css格式 nested（默认嵌套）, expanded（展开的）, compact（紧凑的）, compressed（压缩的）
        precision: 10,
        includePaths: ['.']
      }).on('error', $.sass.logError)))
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({stream: true}));
});

gulp.task('html', () => {
  return gulp.src(['app/**/*.html','!app/include/*.html'])
    .pipe($.if('*.html', $.ejs({},{ext: '.html'})))
    .pipe(gulp.dest('./dist/'))
    .pipe(reload({stream: true}));
});

gulp.task("json", () => {
  return gulp.src(['./app/json/**/*.json'])
    .pipe(gulp.dest('dist/json/'))
    .pipe(reload({stream: true}));
});

// 图片处理
gulp.task('images',() => {
    return gulp.src('app/images/**/*')
        .pipe($.if($.if.isFile, $.cache($.imagemin({
                progressive: true,
                interlaced: true,
                svgoPlugins: [{cleanupIDs: false}]
            }))
            .on('error', function (err) {
                console.log(err);
                this.end();
            })))
        .pipe(gulp.dest('dist/images/'));
});

gulp.task('serve', [ 'uglify',  'html', 'sass', 'images'], () => {
  browserSync({
    notify: false,
    open:true,
    port: 9000,
    browser: "google chrome",
    //reloadDelay: 20000, // 延迟20000毫秒重新加载
    server: {
      baseDir: ['dist'],
      routes: {
        '/bower_components': '../../../../bower_components'
      }
    }
  });



  gulp.watch([
    'app/**/*.html'
  ]).on('change', reload);

  gulp.watch(['app/**/*.html', 'app/js/**/*.js'], [ 'html', 'uglify']);
  gulp.watch(['app/sass/*.scss'], [ 'sass']);
  gulp.watch(['app/json/*.json'], [ 'json']);
  gulp.watch(['app/images/*.*'], [ 'images']);
  gulp.watch(['app/js/*.*'], [ 'uglify']);
});







