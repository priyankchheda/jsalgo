const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const {
  PORT = 3000,
  SESSION_NAME = 'sid',
  SESSION_LIFETIME = 1000 * 60 * 60 * 2,
  SESSION_SECRET = '7h1s1ssom3th1n9thatn3eds70b3s3cr370',
  NODE_ENV = 'development',
} = process.env;

const app = express();

// // mongodb connection
// mongoose.connect('mongodb://localhost/session-auth', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   console.log('mongodb connection established');
// });

// add body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// get mongo User model
const User = require('./models/User');

// add template engine
app.set('view engine', 'ejs');

app.use(session({
  name: SESSION_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: SESSION_LIFETIME,
    sameSite: true,
    secure: NODE_ENV === 'production',
  }
}));

const users = [
  { id: 1, name: 'Alex', email: 'alex@gmail.com', password: 'secret' },
  { id: 1, name: 'Max', email: 'max@gmail.com', password: 'secret' },
  { id: 1, name: 'Hagard', email: 'hagard@gmail.com', password: 'secret' },
]

function redirectLogin(request, response, next) {
  if (!request.session.userId) {
    response.redirect('./login');
  } else {
    next();
  }
};

function redirectHome(request, response, next) {
  if (request.session.userId) {
    response.redirect('./home');
  } else {
    next();
  }
};

app.use(function (request, response, next) {
  const { userId } = request.session;
  if (userId) {
    response.locals.user = users.find(function (user) {
      return user.id === userId;
    })
  }
  next();
});

app.get('/', function (request, response) {
  const { userId } = request.session;
  response.render('index', { userId });
});

app.get('/home', redirectLogin, function (request, response) {
  const { user } = response.locals;
  response.render('home', { user });
});

app.get('/login', redirectHome, function (request, response) {
  const { email, password } = request.body;

  response.render('login');
});

app.post('/login', redirectHome, function (request, response) {
  const { email, password } = request.body;
  if (email && password) {
    const user = users.find(function (user) {
      return user.email === email && user.password === password
    });
    if (user) {
      request.session.userId = user.id;
      return response.redirect('/home');
    }
  }
  response.redirect('/login');
});

app.get('/register', redirectHome, function (request, response) {
  response.render('register');
});

app.post('/register', redirectHome, function (request, response) {
  const { name, email, password } = request.body;
  if (name && email && password) {
    const exists = users.some(function (user) {
      return user.email === email;
    });
    if (!exists) {
      const user = { id: users.length + 1, name, email, password }
      users.push(user);
      request.session.userId = user.id;
      return response.redirect('/home');
    }
  }
  response.redirect('/register');
});

app.post('/logout', redirectLogin, function (request, response) {
  request.session.destroy(err => {
    if (err) {
      return response.redirect('/home');
    }
    response.clearCookie(SESSION_NAME);
    response.redirect('/login');
  });
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));