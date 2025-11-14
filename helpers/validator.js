const validator = require('validatorjs');
const validate = (Body, Rules, Messages, Callback) => {
    const validation = new validator(Body, Rules, Messages);
    validation.passes(() => Callback(null, true));
    validation.fails(() => Callback(validation.errors.all(), false));
};

module.exports = validate;
