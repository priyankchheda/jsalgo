const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
  response.render('index');
});

router.get("/add-article", function(request, response) {
  response.send('add article form');
});

module.exports = router;