var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

// 定義頁面
// 首頁
var indexRouter = require('./routes/index');
// 商品列表, 比價車, 商品資訊頁
var productRouter = require('./routes/product');
var parityRouter = require('./routes/parity');
var productDetailRouter = require('./routes/productDetail');

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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/bootstrap-icons', express.static(__dirname + '/node_modules/bootstrap-icons/font'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);  
app.use('/product', productRouter);
app.use('/parity', parityRouter);
app.use('/productDetail', productDetailRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
