const express = require('express');
const Article = require('../models/article');

const router = express.Router();

router.get('/', (request, response) => {
  Article.find(function(err, articles) {
    if (err) return console.error(err);
    response.render('index', { articles })
  });
});

module.exports = router;