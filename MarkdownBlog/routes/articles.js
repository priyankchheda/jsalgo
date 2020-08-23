const express = require('express');
const Article = require('../models/article');
const router = express.Router();

router.get('/', async function (request, response) {
  const articles = await Article.find().sort({ createdAt: 'desc' });
  response.render('index', { articles });
})

router.get('/new', function (request, response) {
  response.render('new', { article: new Article() });
})

router.post('/new', async function (request, response, next) {
  request.article = new Article();
  next();
}, saveArticleAndRedirect('new'));

router.get('/edit/:id', async function (request, response) {
  const article = await Article.findById(request.params.id);
  response.render('edit', { article: article });
})

router.put('/edit/:id', async function (request, response, next) {
  request.article = await Article.findById(request.params.id);
  next();
}, saveArticleAndRedirect('edit'));

function saveArticleAndRedirect(path) {
  return async (request, response) => {
    let article = request.article
    article.title = request.body.title;
    article.description = request.body.description;
    article.markdown = request.body.markdown;
    try {
      article = await article.save()
      response.redirect(`/article/${article.slug}`)
    } catch (e) {
      console.error(e);
      response.render(`/${path}`, { article });
    }
  }
}

router.get('/article/:slug', async function (request, response) {
  const article = await Article.findOne({ slug: request.params.slug });
  if (article == null) response.redirect('/');
  response.render('show', { article })
});

router.delete('/:id', async function (request, response) {
  await Article.findByIdAndDelete(request.params.id);
  response.redirect('/')
})

module.exports = router;