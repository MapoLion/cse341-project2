const express = require('express');
const router = express.Router();
const videosController = require('../controllers/VideoController');
const validator = require('../middleware/validator');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', videosController.getAll);
router.get('/:id', videosController.getSingle);
router.post('/', validator.validateVideo, videosController.createVideo);
router.put('/:id', validator.validateVideo, videosController.updateVideo);
router.delete('/:id', videosController.deleteVideo);

module.exports = router;