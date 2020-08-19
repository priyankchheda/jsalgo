const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// mongodb connection
mongoose.connect('mongodb://localhost/knowledge_base', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongodb connection established');
});

// add template engine
app.set('view engine', 'ejs');

// add body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// add routers
app.use('/', require('./routes/index'));
app.use('/article', require('./routes/article'));

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

// starting server
app.listen(3000, () => {
  console.log('listening on port 3000');
});
