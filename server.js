const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable append the file');
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: "Welcome to Alex's web site"
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'bad request'
  })
})

app.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
