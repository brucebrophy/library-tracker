const Joi = require('@hapi/joi');

const createBook = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const getBooks = {
  query: Joi.object().keys({
    title: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createBook,
  getBooks,
};
