var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');

// 定義頁面
// 首頁
var indexRouter = require('./routes/index');
// 商品列表, 比價車, 商品資訊頁
var productRouter = require('./routes/product');
var parityRouter = require('./routes/parity');
var productDetailRouter = require('./routes/productDetail');
// 會員專區
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var memberRouter = require('./routes/member');
var memberdataRouter = require('./routes/memberdata');
var addRouter = require('./routes/add')
var trackRouter = require('./routes/track');
var publishedRouter = require('./routes/published')
var altermemberdataRouter = require('./routes/altermemberdata');
var forumRouter = require('./routes/forum');
var articleRouter = require('./routes/article');

var app = express();

// session設定
app.use(
  session({
    secret: 'fhegrgresdfaewef',
    resave: true,
    saveUninitialized: true,
    // cookie: {
    //   path: ,
    //   httpOnly: false,
    //   secure: false,
    //   maxAge: 
    // }
  })
);
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// router setting
app.use('/', indexRouter);  
app.use('/product', productRouter);
app.use('/parity', parityRouter);
app.use('/productDetail', productDetailRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/member', memberRouter);
app.use('/memberdata', memberdataRouter);
app.use('/add', addRouter);
app.use('/track', trackRouter);
app.use('/published', publishedRouter);
app.use('/altermemberdata', altermemberdataRouter);
app.use('/forum', forumRouter);
app.use('/article',articleRouter);

// statis resource
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/bootstrap-icons', express.static(__dirname + '/node_modules/bootstrap-icons/font'));
app.use(express.static(path.join(__dirname, 'public')));

// 登出
app.get('/logout', function (req, res) {
  delete req.session.user;
  res.redirect('/login');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  // res.send(err.message);
});

module.exports = app;
