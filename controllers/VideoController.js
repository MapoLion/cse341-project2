const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// GET ALL
const getAll = async (req, res) => {
    try {
        const videos = 
        await mongodb
        .getDatabase()
        .collection('tv-and-movies')
        .find()
        .toArray();
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ message: "Error: We had problems fetching shows/movies from the library." });
    }
};

//GET Single
const getSingle = async (req, res) => {
    try {
        const videoId = new ObjectId(req.params.id);
        const videos = 
            await mongodb
            .getDatabase()
            .collection('tv-and-movies')
            .find({ _id: videoId })
            .toArray();
        if (!videos[0]) {
            return res.status(404).json({ message: "Error: Sorry, I don't think we can find that show/movie" });
        }
        res.status(200).json(videos[0]);
    } catch (err) {
        res.status(500).json({ message: "Error: We had problems fetching a specific show/movie."});
    }
};

//CREATE
const createVideo = async (req, res) => {
    try {
        const video = {
            title: req.body.title,
            director: req.body.director,
            year: req.body.year
        };
        const response = await mongodb
        .getDatabase()
        .collection('tv-and-movies')
        .insertOne(video);
        if (response.acknowledged) {
            return res.status(201).json({ message: "Success: Your show/movie has been added to the library", id: response.insertedId });
        }
        res.status(500).json({ message: "Error: Couldn't add that show/movie. Sorry."});
    } catch (error) {
        res.status(500).json({ message: "Error: Couldn't add that show/movie. Sorry."});
    }
};

//UPDATE
const updateVideo = async (req, res) => {
    try {
        const videoId = new ObjectId(req.params.id);
        const video = {
            title: req.body.title,
            director: req.body.director,
            year: req.body.year,
        };

    const response = 
    await mongodb.getDatabase()
    .collection('tv-and-movies')
    .replaceOne({_id: videoId}, video);

    if (response.modifiedCount > 0) {
        return res.status(200).json({ message: "Success: Your show/movie has been updated!" });
    } 
        res.status(400).json({ message: "Error: Can't find that show/movie." });
    } catch (err) {
        res.status(500).json({ message: "Error: Couldn't update the show/movie. Sorry."});
    };
};

//DELETE 
const deleteVideo = async (req, res) => {
    try {
        const videoId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDatabase()
            .collection('tv-and-movies')
            .deleteOne({ _id: videoId });

        if (response.deletedCount > 0) {
            return res.status(200).json({ message: "Success: Your show/movie has been removed!" });
        }

        res.status(400).json({ message: "Error: Can't find that show/movie." });
    } catch (err) {
        res.status(500).json({ message: "Error: Couldn't get rid of that show/movie. Sorry."});
    }
};

module.exports = {
    getAll,
    getSingle,
    createVideo,
    updateVideo,
    deleteVideo,
};
