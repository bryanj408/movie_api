const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  uuid = require('uuid'),
  fs = require('fs'),
  path = require('path'),
  mongoose = require('mongoose'),
  Models = require('./models.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let auth = require('./auth')(app);

const { rest } = require('lodash');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFLixDB', 
{ useNewUrlParser: true, useUnifiedTopology: true });


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})



//POST to add new user (NOTE: asking to see if this is the write file to add this too)
//Add a user
/* We'll expet JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/

app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
      newUser.id = uuid.v4();
      users.push(newUser);
      res.status(201).json(newUser);
  } else {
      res.status(400).send('Users need names');
  }
});

app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
  .then((user) => {
    if(user) {
      return res.status(400).send(req.body.Username + 'already exists');
    } else { 
      Users
        .create ({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
        .then((user) => {res.status(201).json(user)
        })
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

//POST method to add movie to favorite movie list
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
  { new: true }, //This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//Get requests
//Adding get request to get all users from 2.8 (ask teacher if changes are needed)
//Get all users
app.get('/users', (req, res) => {
  Users.find()
  .then((users) => {
    res.status(201).json(users);
  })
  .cath((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//Get a user by username
app.get('/users/:Username', (req, res => {
  Users.findOne({ Username: req.params.Username })
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
}));
//Adding get request to get all users from 2.8 (ask teacher if changes are needed)

//PUT method to update user info
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username}, { $set: 
  {
    Username: req.body.Username,
    Password: req.body.Password,
    Email: req.body.Email,
    Birthday: req.body.Birthday
  }
},
{ new: true }, //this line makes sure that the updates docuent is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//Delete movie from user's favouriteMovies list
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $pull: { FavouriteMovies: req.params.MovieID },
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//DELETE user by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username
  })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Usernam + ' was deleted');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.send('/', (req, res) => {
    res.send('Welcome to my movie list!')
});



app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname })
});

app.get('/movies', (req, res) => {
  res.json(topMovies)
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something is broken')
});

app.get('/', (req, res) => {
  res.send('Welcome to myFlixDB!');
});

//listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080')
});
