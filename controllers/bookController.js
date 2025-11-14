const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// GET ALL
const getAll = async (req, res) => {
    try {
        const books = 
        await mongodb
        .getDatabase()
        .collection('books')
        .find()
        .toArray();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: "Error: We had problems fetching books from the library." });
    }
};

//GET Single
const getSingle = async (req, res) => {
    try {
        const bookId = new ObjectId(req.params.id);
        const books = 
            await mongodb
            .getDatabase()
            .collection('books')
            .find({ _id: bookId })
            .toArray();
        if (!books[0]) {
            return res.status(404).json({ message: "Error: Sorry, I don't think we can find that book" });
        }
        res.status(200).json(books[0]);
    } catch (err) {
        res.status(500).json({ message: "Error: We had problems fetching a specific book."});
    }
};

//CREATE
const createBook = async (req, res) => {
    try {
        const book = {
            title: req.body.title,
            author: req.body.author,
            firstPublished: req.body.firstPublished
        };
        const response = await mongodb
        .getDatabase()
        .collection('books')
        .insertOne(book);
        if (response.acknowledged) {
            return res.status(201).json({ message: "Success: Your book has been added to the library", id: response.insertedId });
        }
        res.status(500).json({ message: "Error: Couldn't add that book. Sorry."});
    } catch (error) {
        res.status(500).json({ message: "Error: Couldn't add that book. Sorry."});
    }
};

//UPDATE
const updateBook = async (req, res) => {
    try {
        const bookId = new ObjectId(req.params.id);
        const book = {
            title: req.body.title,
            author: req.body.author,
            firstPublished: req.body.firstPublished,
        };

    const response = 
    await mongodb.getDatabase()
    .collection('books')
    .replaceOne({_id: bookId}, book);

    if (response.modifiedCount > 0) {
        return res.status(200).json({ message: "Success: Your book has been updated!" });
    } 
        res.status(400).json({ message: "Error: Can't find that book." });
    } catch (err) {
        res.status(500).json({ message: "Error: Couldn't update the book. Sorry."});
    };
};

//DELETE 
const deleteBook = async (req, res) => {
    try {
        const bookId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDatabase()
            .collection('books')
            .deleteOne({ _id: bookId });

        if (response.deletedCount > 0) {
            return res.status(200).json({ message: "Success: Your book has been removed!" });
        }

        res.status(400).json({ message: "Error: Can't find that book." });
    } catch (err) {
        res.status(500).json({ message: "Error: Couldn't get rid of that book. Sorry."});
    }
};

module.exports = {
    getAll,
    getSingle,
    createBook,
    updateBook,
    deleteBook,
};