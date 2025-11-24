const express = require('express');
const router = express.Router();
const booksController = require('../controllers/BookController');
const validator = require('../middleware/validator');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);
router.post('/', isAuthenticated, validator.validateBook, booksController.createBook);
router.put('/:id', isAuthenticated, validator.validateBook, booksController.updateBook);
router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;