const validator = require('../helpers/validator');

const validateBook = (req, res, next) => {
    const valid = {
        title: "required|string",
        author: "required|string",
        firstPublished: "string"
    };

validator(req.body, valid, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
});
};

module.exports = { validateBook };