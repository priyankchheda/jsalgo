const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes')

mongoose.connect('mongodb://localhost:27017/todos', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(function () { console.log('mongo database connected') })

app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const mustacheExpressInstance = mustacheExpress();
mustacheExpressInstance.cache = null;
app.engine('mustache', mustacheExpressInstance);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use('/', routes);

app.listen(3000, function () {
  console.log('listening on port 3000');
});