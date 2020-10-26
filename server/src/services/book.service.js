const httpStatus = require('http-status');
const { Book } = require('../models');

/**
 * Create a book
 * @param {Object} bookBody
 * @returns {Promise<Book>}
 */
const createBook = async (bookBody) => {
  const book = await Book.create(bookBody);
  return book;
};

/**
 * Query for books
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBooks = async (filter, options) => {
  console.log(filter);
  const books = await Book.paginate(filter, options);
  return books;
};

module.exports = {
  createBook,
  queryBooks,
};
