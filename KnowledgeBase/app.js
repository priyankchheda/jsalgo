const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

app.use('/', require('./routes/index'));
app.use('/article', require('./routes/article'));

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('listening on port 3000');
});
