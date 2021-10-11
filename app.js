var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var { Success, Error , Account} = require('./response');
var db = require('./db/db');

// 定義頁面
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var memberRouter = require('./routes/member');
var memberdataRouter = require('./routes/memberdata');
var addRouter = require('./routes/add')
var trackRouter = require('./routes/track');
var publishedRouter = require('./routes/published')
var altermemberdataRouter = require('./routes/altermemberdata');
var forumRouter = require('./routes/forum');
const e = require('express');

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

app.use(bodyParser.json());
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
app.use('/forum', forumRouter);

app.post('/signup', function (req, res) {
  var body = req.body
  console.log(body);
  var sql = `call fsp_member_add(?, ?, ?, ?, ?);`
  var data = [body.account, body.password, body.full_name, body.nickname, body.email]
  db.exec(sql, data, function (results, fields) {
    var message = JSON.stringify(results[0][0]);
    console.log(message);
    if (message.includes('註冊成功') != false) {
      res.send(
        JSON.stringify(new Success('login success'))
      )
    }
    else{
      res.end(
        JSON.stringify(new Error('login failed'))
      )
    }
  })
})

app.post('/login', function (req, res) {
  var sql = `call fsp_member_login(?, ?);`
  var data = [req.body.account, req.body.password]
  db.exec(sql, data, function (results, fields) {
    console.log(results);
    var data = JSON.stringify(results);
    // var dataclear = JSON.parse(data);
    // var member_id = JSON.stringify(results,['member_id'])
    // var account = JSON.stringify(results,['account'])
    // var full_name = JSON.stringify(results,['full_name'])
    // var nickname = JSON.stringify(results,['nickname'])
    // var email = JSON.stringify(results,['email'])
    // console.log(dataclear)
  

    if (data.includes('密碼錯誤') != false) {
      res.end(
        JSON.stringify(new Error('login failed'))
      )

    }
    else if(data.includes('帳號不存在') != false){
      res.end(
        JSON.stringify(new Account('login failed'))
      )
    }

    else if(data.includes('帳號禁用') != false){
      res.end(
        JSON.stringify(new Account('login failed'))
      )
    }
    else {
      req.session.user = {
        data: results[0],
        // member_id: member_id ,
        // account: account,
        // full_name: full_name,
        // nickname: nickname,
        // email: email
      }
      res.send(
        JSON.stringify(new Success('login success'))
      )
    }
    console.log(req.session.user);
  })
})


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
