const express = require('express'),
    uuid = require('uuid'),
    bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


const movies = [
    {
        title: 'The Royal Tenenbaums',
        director: 'Wes Anderson'
    },
    {
        title: 'The Life Aquatic',
        director: 'Wes anderson'
    },
    {
        title: 'The Darjeeling Limited',
        director: 'Wes Anderson'
    },
    {
        title: 'Fantastic Mr. Fox',
        director: 'Wes Anderson'
    },
    {
        title: 'Moonrise Kingdom',
        director: 'Wes anderson'
    },
    {
        title: 'The Grand Budapest Hotel',
        director: 'Wes Anderson'
    },
    {
        title: 'The French Dispatch',
        director: 'Wes Anderson'
    },
    {
        title: 'Isle of Dogs',
        director: 'Wes Anderson'
    },
    {
        title: 'Rushmore',
        director: 'Wes Anderson'
    },
    {
        title: 'bottle rocket',
        director: 'Wes Anderson'
    },
];

//returns full list of movies
app.get('/movies', (req, res) => {
    res.json(movies);
});

//returns description, director, actors, etc of specific movie
app.get('/movies/title', (req, res) => {
    res.send('Here is the title you are looking for');
});

//returns a specific genre from a movie
app.get('/movies/title/genre', (req, res) => {

});

//returns info on a director from a specific movie
app.get('/movies/title/director', (req, res) => {

});

//allow new users to register an account (may or may not require id at endpoint)
app.post('/users/id', (req, res) => {

});

//allow new users to update their personal info
app.put('/users/id', (req, res) => {

});

//allows users to add a movie to their favorites list in their profile
app.post('/users/id/favoriteMovie', (req, res) => {

});

//allows users to delete a movie from their favorites list in their profile
app.delete('/users/id/favoriteMovie', (req, res) => {

});

//allows users to delete/remove their profile entirely
app.delete('/users/id', (req, res) => {

});

app.listen(8080, () => {
    console.log('Your app is running on port 8080.');
});