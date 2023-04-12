//launch localhost (node index.js)

const express = require('express'),
    uuid = require('uuid'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//changed localhost:8080 to 27017 to get postman to communicate
mongoose.connect('mongodb://localhost:27017/movie_api', 
{ useNewUrlParser: true, useUnifiedTopology: true });


//returns full list of movies
app.get('movies', (req, res) => {
    Movies.find()
    .then((movies) => {
        res.json(movies);
        res.status(201).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
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

//allow new users to register an account/add new user
/* expecting JSON in this format
{
    ID: integer,
    Username: String,
    Password: String,
    Email: String,
    Birthday: Date
}*/
app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
    .then((user) => {
        if (user) {
            return res.status(400).send(req.body.Username + 'already exists');
        } else {
            Users
            .create({
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            })
            .then((user) => {res.status(201).json(user) })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error: ' + error);
            })
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
    });
});

//GET request to get a list of all users
app.get('/users', (req, res) => {
    Users.find()
    .then((users) => {
        res.status(201).json(users);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//GET request to get info about a certain user by username
app.get('/users/:Username', (req, res) => {
    Users.findOne({ Username: req.params.Username })
    .then((user) => {
        res.json(user);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//allow new users to update their personal info
/* Expect JSON in this format
{
    Username: String, (required)
    Password: String, (required)
    Email: String, (required)
    Birthday: Date
}*/
app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username 
        }, { $set: 
            {
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            }
        },
        { new: true },  //this makes sure the updated document is returned
        (err, updatedUser) => {
            if(err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
    });

//allows users to add a movie to their favorites list in their profile
app.post('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username },
        {
            $push: { FavoriteMovies: req.params.MovieID }
        },
        { new: true }, //makes sure the updated document is returned
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        }); 
    });

//allows users to delete a movie from their favorites list in their profile
//difference from adding movies with post ^^ is 'app.delete' and '$pull'
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username },
        {
            $pull: { FavoriteMovies: req.params.MovieID }
        },
        { new: true }, //makes sure the updated document is returned
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
    });

//allows users to delete/remove their profile entirely
app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
        if (!user) {
            res.status(400).send(req.params.Username + ' was not found ');
        } else {
            res.status(200).send(req.params.Username + ' was deleted.');
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error ' + err);
    });
});

app.listen(8080, () => {
    console.log('Your app is running on port 8080.');
});