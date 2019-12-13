'use strict';
const express = require('express');
const app = express();
const port = 3000;
const passport = require('./utils/pass');
const username = 'foo';
const password = 'bar';
const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/form');
  }
};

app.use(passport.initialize());
app.use(passport.session());

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/setCookie', function(req, res){
  res.cookie('color', 'red').send('cookie set');
});

app.get('/deleteCookie', function(req, res){
  res.clearCookie('color');
  res.send('cookie cleared');
});

app.get('/form', (req, res) => {
  res.render('views/form.pug');
});

app.get('/secret', loggedIn, (req, res) => {
  res.render('secret');
});

app.post('/login',
    passport.authenticate('local', {failureRedirect: '/form'}),
    (req, res) => {
      console.log('success');
      res.redirect('/secret');
    });