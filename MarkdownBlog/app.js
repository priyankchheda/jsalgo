const express = require('express');
const articleRouter = require('./routes/articles');
const mongoose = require('mongoose');
const Article = require('./models/article');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/markdown-blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', articleRouter);

app.listen(5000, function () {
  console.log('listening on port 3000');
})