var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const paginate = require('express-paginate');
var cors = require('cors');
var indexRouter = require('./routes/routes-index');
var authRouter = require('./routes/routes-auth')
var profileRouter = require('./routes/routes-profile')
var gamesRouter  = require('./routes/routes-games')
var multimediaRouter = require('./routes/routes-multimedia');

const app = express();
const session = require('express-session');
const flash = require('express-flash');

app.use(express.urlencoded({ extended: false }));
app.use(
	session({
		secret: 'Buat ini jadi rahasia',
		resave: false,
		saveUninitialized: false
	})
);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

app.use(paginate.middleware(10, 50));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/games', gamesRouter);
app.use('/multimedia', multimediaRouter);

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
