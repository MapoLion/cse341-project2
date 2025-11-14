const express = require('express');
const router = express.Router();
const booksController = require('../controllers/BookController');
const validator = require('../middleware/validator');

router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);
router.post('/', validator.validateBook, booksController.createBook);
router.put('/:id', validator.validateBook, booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;