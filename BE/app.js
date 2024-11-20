var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//config mogoose
const mongoose = require('mongoose');
require('./models/User');
require('./models/Phim');
require('./models/Ve');
require('./models/Suatchieu');
require('./models/Giohang');
require('./models/Tichdiem');
require('./models/Khuyenmai');
require('./models/Admin');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var phimRouter = require('./routes/phims');
var veRouter = require('./routes/ves');
var suatchieuRouter = require('./routes/suatchieus');
var giohangRouter = require('./routes/giohangs');
var tichdiemRouter = require('./routes/tichdiems');
var khuyenmaiRouter = require('./routes/khuyenmais');
var adminRouter = require('./routes/admins');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/configSwagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//connect database
//mongodb://localhost:27017/
mongoose.connect('mongodb://localhost:27017/Agile', {
  // mongoose.connect('mongodb+srv://khanhvo908:0774749399@cluster0.g5qbg.mongodb.net/MD19201', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));


//http://localhost:3000/home
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/phim', phimRouter);
app.use('/ve', veRouter);
app.use('/suatchieu', suatchieuRouter);
app.use('/giohang', giohangRouter);
app.use('/tichdiem', tichdiemRouter);
app.use('/khuyenmai', khuyenmaiRouter);
app.use('/admin', adminRouter);

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
