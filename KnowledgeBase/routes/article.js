const express = require('express');

const router = express.Router();

router.get('/:id', (request, response) => {
  response.send(`show article ${request.params.id}`);
});

router.get("/:id/edit", function(request, response) {
  response.send(`edit article ${request.params.id}`);
});

router.get("/:id/delete", function(request, response) {
  response.send(`delete article ${request.params.id}`);
});

module.exports = router;