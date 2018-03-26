'use strict';
module.exports = function(app) {
  var bookControlller = require('../controllers/bookController');

  // todoList Routes
  app.route('/books')
    .get(bookControlller.list_all_books)
    .post(bookControlller.create_a_book);


  app.route('/books/:_id')
    .get(bookControlller.read_a_book)
    .put(bookControlller.update_a_book)
    .delete(bookControlller.delete_a_book);

  app.route('/cart')
    .get(bookControlller.books_in_cart)

  app.route('/cart/:_id')
  .post(bookControlller.add_to_cart)
    .delete(bookControlller.delete_from_cart);

    app.route('/buy')
    .get(bookControlller.get_cart_price)

  app.route('/buy/:_id')
  .get(bookControlller.get_book_price)
};
