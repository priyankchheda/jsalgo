const express = require('express');
const Article = require('../models/article');

const router = express.Router();

router.get('/add', function(request, response) {
  response.render('add_article');
});

router.post('/add', function(request, response) {
  const article = new Article({
    title: request.body.title,
    author: request.body.author,
    body: request.body.body
  });
  article.save(function(err) {
    if (err) return console.error(err);
    response.redirect('/');
  });
});

router.get('/:id', (request, response) => {
  Article.findById(request.params.id, function(err, article) {
    response.render('view_article', { article });
  });
});

router.get("/:id/edit", function(request, response) {
  Article.findById(request.params.id, function(err, article) {
    response.render('edit_article', { article });
  });
});

router.post("/:id/edit", function(request, response) {
  const article = {
    title: request.body.title,
    author: request.body.author,
    body: request.body.body
  };

  Article.findByIdAndUpdate(request.params.id, article, function(err) {
    if (err) return console.error(err);
    response.redirect('/');
  });
});

router.delete("/:id/delete", function(request, response) {
  Article.findByIdAndDelete(request.params.id, function(err) {
    if (err) { console.log(err); }
    response.send('article successfully deleted');
  });
});

module.exports = router;