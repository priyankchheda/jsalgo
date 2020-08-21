const router = require('express').Router();
const Todo = require('../models/todo');

router.get('/', function (request, response) {
  Todo.find({}).then(function (results) {
    const todos = results.filter(todo => !todo.done);
    const doneTodos = results.filter(todo => todo.done);
    response.render('index', { todos, doneTodos });
  });
})

router.post('/todos', function (request, response) {
  const newTodo = new Todo({ description: request.body.description });
  newTodo.save().catch(err => console.error(err))
  response.redirect('/');
})

router.post('/todos/:id/completed', function (request, response) {
  Todo.findById(request.params.id).then(result => {
    result.done = !result.done;
    result.save();
  }).then(() => response.redirect('/'));
});

module.exports = router;