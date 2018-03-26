'use strict';
module.exports = function(app) {
  var genreController = require('../controllers/genreController');

  // todoList Routes
  app.route('/genres')
    .get(genreController.list_all_genres)
    .post(genreController.create_a_genre);


  app.route('/genres/:_id')
    .get(genreController.read_a_genre)
    .put(genreController.update_a_genre)
    .delete(genreController.delete_a_genre);
};
