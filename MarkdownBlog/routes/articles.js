const express = require('express');
const Article = require('../models/article');
const router = express.Router();

router.get('/new', function (request, response) {
  response.render('articles/new', { article: new Article() });
})

router.get('/edit/:id', async function (request, response) {
  const article = await Article.findById(request.params.id);
  response.render('articles/edit', { article: article });
})

router.post('/', async function (request, response, next) {
  request.article = new Article();
  next();
}, saveArticleAndRedirect('new'));

router.put('/:id', async function (request, response, next) {
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
      response.redirect(`/articles/${article.slug}`)
    } catch (e) {
      console.error(e);
      response.render(`articles/${path}`, { article });
    }
  }
}

router.get('/:slug', async function (request, response) {
  const article = await Article.findOne({ slug: request.params.slug });
  if (article == null) response.redirect('/');
  response.render('articles/show', { article })
});

router.delete('/:id', async function (request, response) {
  await Article.findByIdAndDelete(request.params.id);
  response.redirect('/')
})

module.exports = router;