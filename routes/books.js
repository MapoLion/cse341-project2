const express = require('express');
const router = express.Router();
const booksController = require('../controllers/BookController');

router.get('/:id', booksController.getSingle);
router.get('/', booksController.getAll);
router.post('/', booksController.createBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;