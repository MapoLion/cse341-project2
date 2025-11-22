const validator = require('../helpers/validator');

const validateBook = (req, res, next) => {
  const rules = {
    title: "required|string",
    author: "required|string",
    genre: "array",
    pages: "integer",
    publisher: "string",
    year: "integer"
  };

  runValidation(req, res, next, rules);
};

const validateVideo = (req, res, next) => {
  const rules = {
    title: "required|string",
    director: "required|string",
    year: "integer",
    distributor: "string",
    genre: "array",
    runtime: "string"
  };

  runValidation(req, res, next, rules);
};

const runValidation = (req, res, next, rules) => {
  validator(req.body, rules, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }
    next();
  });
};


module.exports = { validateBook, validateVideo };