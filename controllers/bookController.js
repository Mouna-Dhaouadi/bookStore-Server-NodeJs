'use strict';

var mongoose = require('mongoose'),
  Book = mongoose.model('Book');
 
exports.list_all_books = function(req, res) {
  Book.find(req.query,function(err, books) {
    if (err)
      res.send(err);
      
    var returnBooks=[];
    books.forEach(function(element)
  {var newBook= element.toJSON();
    newBook.links={};
    newBook.links.self= 'http://'+req.headers.host+'/books/'+newBook._id;
    return returnBooks.push(newBook);
  });
    
    res.json(returnBooks);
  });
};


exports.create_a_book = function(req, res) {
  var book = new Book(req.body);
  book.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_book = function(req, res) {
  Book.findById(req.params._id, function(err, task) {
      console.log(task);
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_book = function(req, res) {
  Book.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_book = function(req, res) {
  Book.remove({
    _id: req.params._id
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Book successfully deleted' });
  });
};

  exports.add_to_cart = function(req,res)
  {

      Book.findOneAndUpdate({_id:req.params._id},{in_cart:true}, function(err, book) {
      if (err)
        res.send(err);
      
        res.json(book);

    });
  };

exports.books_in_cart= function(req, res)
{ Book.find({in_cart:true},function(err, books) {
  if (err)
    res.send(err);
  res.json(books);

});
};

exports.delete_from_cart= function(req, res)
{

  Book.remove({_id:req.params._id}, function(err, book) {
    if (err)
      res.send(err);
    
      res.json(book);

  });
 };

 exports.get_cart_price=function(req,res)
 {
  Book.find({in_cart:true},function(err, books) {
    if (err)
      res.send(err);
    
     var totalPrice=0;
     books.forEach(function(element)
     {
      var price = element.price ;
       totalPrice += price;
     });
              
    res.json(totalPrice);
  });
};

exports.get_book_price=function(req,res)
{
  Book.findById(req.params._id, function(err, task) {
    if (err)
      res.send(err);
    res.json(task.price);
  });
};

