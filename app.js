var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
<<<<<<< HEAD
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var parityRouter = require('./routes/parity');
=======
var db = require('./db/db')

// 定義頁面
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var memberRouter = require('./routes/member');
var memberdataRouter = require('./routes/memberdata');
var chatRouter = require('./routes/chat');
>>>>>>> b4a3ed36edcd5ec4b0c55b318555dd81ca29acfe

var app = express();
app.use(bodyParser.json());

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
app.use(express.static(path.join(__dirname, 'public')));
// 頁面設置
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/member', memberRouter);
app.use('/memberdata', memberdataRouter);
app.use('/chat', chatRouter);

app.post('/add', function(req, res){
  var body = req.body
  console.log(body)
    var sql = `call fsp_member_add(?, ?, ?, ?, ?);`
    var data = [body.account,body.password,body.full_name,body.nickname,body.email]
    db.exec(sql, data, function(results, fields) {
      console.log(results)
  })
})

app.post('/login')



<<<<<<< HEAD
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/parity', parityRouter);
=======
>>>>>>> b4a3ed36edcd5ec4b0c55b318555dd81ca29acfe

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
