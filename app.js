var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');

// 定義頁面
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var memberRouter = require('./routes/member');
var memberdataRouter = require('./routes/memberdata');
var addRouter = require('./routes/add')
var trackRouter = require('./routes/track');
var publishedRouter = require('./routes/published')
var altermemberdataRouter = require('./routes/altermemberdata');

var app = express();
app.use(session({
  secret: 'iusethiswtfthings',
  resave: false,
  saveUninitialized: false,

  // cookie:{
  //     path: '/',
  //     httpOnly: true,
  //     secure: false,
  //     maxAge: 10 * 60*1000
  // }
}))

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});


app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// 頁面設置
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/member', memberRouter);
app.use('/memberdata', memberdataRouter);
app.use('/add', addRouter);
app.use('/track', trackRouter);
app.use('/published', publishedRouter);
app.use('/altermemberdata', altermemberdataRouter);


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
});

module.exports = app;
