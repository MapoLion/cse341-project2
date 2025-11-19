const router = require('express').Router();
const path = require('path');
const passport = require('passport');

router.use('/', require('./swagger'));

router.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.use('/books', require('./books'));
router.use('/videos', require('./videos'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;