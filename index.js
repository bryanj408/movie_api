const express = require('express');
const app = express();
morgan = require('morgan');
fs = require('fs');
path = require('path');


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

let topMovies = [
  {
    title: "The Revenant",
    director: "Alejandro González Iñárritu",
    year: "2015"
  },
  {
    title: "The Grand Budapest Hotel",
    director: "Wes Anderson",
    year: "2014"
  },
  {
    title: "Saving Private Ryan",
    director: "Steven Spielberg",
    year: "1998"
  },
  {
    title: "Gangs of New York",
    director: "Martin Scorsese",
    year: "2002"
  },
  {
    title: "The Joker",
    director: "Todd Phillips",
    year: "2019"
  },
  {
    title: "Inglourious Bastards",
    director: "Quentin Tarantino",
    year: "2009"
  },
  {
    title: "There Will Be Blood",
    director: "Paul Thomas Anderson",
    year: "2007"
  },
  {
    title: "They Shall Not Grow Old",
    director: "Peter Jackson",
    year: "2019"
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    year: "2008"
  },
  {
    title: "Darkest Hour",
    director: "Joe Wright",
    year: "2017"
  },
];

//Get requests
app.send('/', (req, res) => {
    res.send('Welcome to my movie list!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something is broken');
});

//listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});
