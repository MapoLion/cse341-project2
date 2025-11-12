const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

//GET Single
const getSingle = async (req, res) => {
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('books').find({ _id: bookId });
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books[0]);
    });
};

//GET All
const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().collection('books').find ();
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    });
};

//CREATE
const createBook = async (req, res) => {
    const book = {
        title: req.body.title,
        author: req.body.author,
        firstPublished: req.body.firstPublished,
    };
    const response = await mongodb.getDatabase().collection('books').insertOne(book)
    if (response.acknowledged) {
        res.status(204).send();
     } else {
        res.status(500).json(response.error || 'Some error occurred while updating the book.');
    }
};

//UPDATE
const updateBook = async (req, res) => {
    const bookId = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        author: req.body.author,
        firstPublished: req.body.firstPublished,
    };
    const response = await mongodb.getDatabase().collection('books').replaceOne({_id: bookId}, book);
    if (response.modifiedCount > 0) {
        res.status(204).send();
     } else {
        res.status(500).json(response.error || 'Some error occurred while updating the book.');
    }
};

//DELETE 
const deleteBook = async (req, res) => { 
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().collection('books').deleteOne({_id: bookId});
    if (response.deletedCount > 0) {
        res.status(204).send();
     } else {
        res.status(500).json(response.error || 'Some error occurred while updating the book.');
    }
}; 

module.exports = {
    getAll,
    getSingle,
    createBook,
    updateBook,
    deleteBook,
};