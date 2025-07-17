require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit('pronto')
  })
  .catch(e => console.log(e));
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flashMessage = require('connect-flash');
const routes = require('./routes.js');
const path = require("path")
const helmet = require('helmet');
const csurf = require('csurf');
const { middleWareGlobal, csrfError, csrfMiddleware } = require('./src/middlewares/middleware.js');

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));


const sessionOptions = session({
  secret: 'klklklkljhjhjhhjddd',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flashMessage());

app.set('views', path.resolve('src', 'views'));
app.set('view engine', 'ejs')

app.use(csurf());
//Midleware Global
app.use(middleWareGlobal);
app.use(csrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});