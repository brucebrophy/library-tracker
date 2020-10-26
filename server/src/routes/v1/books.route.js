const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const bookValidation = require('../../validations/book.validation');
const bookController = require('../../controllers/book.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageBooks'), validate(bookValidation.createBook), bookController.createBook)
  .get(auth('getBooks'), validate(bookValidation.getBooks), bookController.getBooks);

module.exports = router;