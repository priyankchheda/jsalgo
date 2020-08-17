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
  response.send(`edit article ${request.params.id}`);
});

router.get("/:id/delete", function(request, response) {
  response.send(`delete article ${request.params.id}`);
});

module.exports = router;