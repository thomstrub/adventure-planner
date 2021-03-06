var router = require('express').Router();
const passport = require('passport');
var indexCtrl = require('../controllers/index');

// The root route renders our only view
router.get('/', indexCtrl.index)
router.get('/dashboard', indexCtrl.isLoggedIn, indexCtrl.dash)

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/dashboard', // where do you want the client to go after you login 
    failureRedirect : '/' // where do you want the client to go if login fails
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;