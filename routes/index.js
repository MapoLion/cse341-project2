const router = require('express').Router();
const path = require('path');
router.use('/', require('./swagger'));

router.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.use('/books', require('./books'));
router.use('/videos', require('./videos'));

module.exports = router;