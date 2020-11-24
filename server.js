var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
// session middleware
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');

// load the env vars
require('dotenv').config();

// create the Express app
var app = express();

// connect to the MongoDB with mongoose
require('./config/database');
// configure Passport
require('./config/passport');

//require our routes
var indexRoutes = require('./routes/index');
var adventuresRoutes = require('./routes/adventures');
var hikingRoutes = require('./routes/hiking');
var backpackingRoutes = require('./routes/backpacking');

console.log(process.env, "env --------------------")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// mount the session middleware
app.use(session({
  secret: 'SEI Rocks!',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// middleware to avoid having to pass user: req.user every time a view is rendered
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
})


// mount all routes with appropriate base paths
app.use('/adventures', adventuresRoutes);

app.use('/adventures/hiking', hikingRoutes);
app.use('/adventures/backpacking', backpackingRoutes);
app.use('/', indexRoutes);


// invalid request, send 404 page
app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});

module.exports = app;
