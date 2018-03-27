'use strict';


var mongoose = require('mongoose'),
  Genre = mongoose.model('Genre');

exports.list_all_genres = function(req, res) {
  Genre.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create_a_genre = function(req, res) {
  var genre = new Genre(req.body);
  console.log(req.body);
  genre.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_genre = function(req, res) {
  Genre.findById(req.params._id, function(err, task) {
      console.log(task);
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_genre = function(req, res) {
  Genre.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_genre = function(req, res) {
  Genre.remove({
    _id: req.params._id
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Genre successfully deleted' });
  });
};
