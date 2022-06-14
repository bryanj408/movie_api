const { json } = require('express/lib/response');

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

app.use(bodyParser.json());

let users = [
    {
        id: 1,
        name: "Kim",
        favoriteMovies: []
    },
    {
        id: 2,
        name: "Joe",
        favoriteMovies: ["The Grand Budapest Hotel"]
    }
]

let movies = [

    {
        "title": "The Revenant",
        "Description": "A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.",   
        "Genre": {
            "Name":"Thriller",
            "Description":"Thriller is a genre of fiction, having numerous, often overlapping subgenres. Thrillers are characterized and defined by the moods they elicit, giving viewers heightened feelings of suspense, excitement, surprise, anticipation and anxiety."
        }, 
        "Director": {
            "Name":"Alejandro González Iñárritu",
            "Bio":"Alejandro González Iñárritu (/ɪˈnjɑːrɪtuː/; American Spanish: [aleˈxandɾo ɣonˈsales iˈɲaritu]; credited since 2014 as Alejandro G. Iñárritu; born 15 August 1963) is a Mexican filmmaker. He is primarily known for making modern psychological drama films about the human condition. His projects have garnered critical acclaim and numerous accolades including eight Academy Awards with a Special Achievement Award, six Golden Globe Awards, eight British Academy Film Awards, two American Film Institute Awards, two Directors Guild of America Awards and a Producers Guild of America Award. His most notable films include Amores perros (2000), 21 Grams (2003), Babel (2006), Biutiful (2010), Birdman (2014), and The Revenant (2015)."
        },
    },
    {
        "title":"Saving Private Ryan",
        "Description":"Saving Private Ryan is a 1998 American epic war film directed by Steven Spielberg and written by Robert Rodat. Set during the Invasion of Normandy in World War II, the film is known for its graphic portrayal of war, especially its depiction of the Omaha Beach assault during the Normandy landings.",  
        "Genre": {
            "Name":"Drama",
            "Description":"In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
        }, 
        "Director": {
            "Name":"Steven Spielberg",
            "Bio":"Steven Allan Spielberg (/ˈspiːlbɜːrɡ/; born December 18, 1946) is an American film director, producer, and screenwriter.[1] A notable figure of the New Hollywood era, he is the most commercially successful director of all time. Spielberg is the recipient of various accolades, including three Academy Awards (including two Best Director wins), a Kennedy Center honor, a Cecil B. DeMille Award, and an AFI Life Achievement Award. Time magazine named him one of the 100 Most Important People of the Century in 2013."
        },
    },
    {
        "title":"The Grand Budapest hotel", 
        "Description":"The Grand Budapest Hotel is a 2014 comedy-drama film written and directed by Wes Anderson. Ralph Fiennes leads a seventeen-actor ensemble cast as Monsieur Gustave H., famed concierge of a twentieth-century mountainside resort in the fictional Eastern European country of Zubrowka. When Gustave is framed for the murder of a wealthy dowager (Tilda Swinton), he and his recently befriended protégé Zero (Tony Revolori) embark on a quest for fortune and a priceless Renaissance painting amidst the backdrop of an encroaching fascist regime.",   
        "Genre": {
            "Name":"Comedy",
            "Description":"A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through amusement. Films in this style traditionally have a happy ending (black comedy being an exception)."
        }, 
        "Director": {
            "Name":"Wes Anderson",
            "Bio":"Wesley Wales Anderson (born May 1, 1969) is an American filmmaker. His films are known for their eccentricity and unique visual and narrative styles.[1] Cited by some critics as a modern-day example of the work of an auteur, three of Anderson's films — The Royal Tenenbaums (2001), Moonrise Kingdom (2012), and The Grand Budapest Hotel (2014) — appeared in BBC Culture's 2016 poll of the greatest films since 2000.[2]"
        },
    },  
    {
        "title":"Inglourious Basterds", 
        "Description":"Inglourious Basterds is a 2009 war film[7] written and directed by Quentin Tarantino, starring Brad Pitt, Christoph Waltz, Michael Fassbender, Eli Roth, Diane Kruger, Daniel Brühl, Til Schweiger and Mélanie Laurent. The film tells an alternate history story of two plots to assassinate Nazi Germany's leadership—one planned by Shosanna Dreyfus, a young French Jewish cinema proprietor, and the other by the British but ultimately conducted solely by a team of Jewish American soldiers led by First Lieutenant Aldo Raine. Christoph Waltz co-stars as Hans Landa, an SS colonel in charge of tracking down Raine's group.",    
        "Genre": {
            "Name":"War",
            "Description":"War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama. It has been strongly associated with the 20th century.[1][2] The fateful nature of battle scenes means that war films often end with them."
        }, 
        "Director": {
            "Name":"Quentin Tarantino",
            "Bio":"Quentin Jerome Tarantino (/ˌtærənˈtiːnoʊ/; born March 27, 1963)[1] is an American filmmaker, actor, film critic and author. His films are characterized by frequent references to popular culture and film history, nonlinear storylines, dark humor, stylized violence, extended dialogue, pervasive use of profanity, cameos and ensemble casts."
        },
    },  
    {
        "title":"The Darkest Hour", 
        "Description":"Darkest Hour is a 2017 war drama film directed by Joe Wright and written by Anthony McCarten. The film is an account of Winston Churchill's early days as Prime Minister of the United Kingdom during the Second World War and the May 1940 War Cabinet Crisis, depicting his refusal to seek a peace treaty with Nazi Germany amid their advance into Western Europe.",
        "Genre": {
            "Name":"War",
            "Description":"War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama. It has been strongly associated with the 20th century.[1][2] The fateful nature of battle scenes means that war films often end with them."
        }, 
        "Director": {
            "Name":"Joe Wright",
            "Bio":"Joseph Wright (born 25 August 1972) is a British film director residing in Somerset, England. His motion pictures include the literary adaptations Pride & Prejudice (2005) and Anna Karenina (2012), the romantic war drama Atonement (2007), the action thriller Hanna (2011), Peter Pan origin story Pan (2015),[1] and Darkest Hour (2017), a political drama following Winston Churchill during World War II nominated for Best Picture.[2]"
        },
    },  
    {
        "title":"The Joker", 
        "Description":"Joker is a 2019 American psychological thriller film directed and produced by Todd Phillips, who co-wrote the screenplay with Scott Silver. The film, based on DC Comics characters, stars Joaquin Phoenix as the Joker and provides a possible origin story for the character. Set in 1981, it follows Arthur Fleck, a failed clown and aspiring stand-up comedian whose descent into insanity and nihilism inspires a violent counter-cultural revolution against the wealthy in a decaying and destroyed Gotham City.",    
        "Genre": {
            "Name":"Drama",
            "Description":"In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
        }, 
        "Director": {
            "Name":"Todd Philips",
            "Bio":"Todd Phillips (né Bunzl, born December 20, 1970)[1] is an American filmmaker and occasional actor. Phillips began his career in 1993 and directed films in the 2000s such as Road Trip, Old School, Starsky & Hutch, and School for Scoundrels."
        },
    },  
    {
        "title":"The Dark Knight",
        "Description":"The Dark Knight is a 2008 superhero film directed by Christopher Nolan from a screenplay he co-wrote with his brother Jonathan. Based on the DC Comics superhero Batman, it is the sequel to Batman Begins (2005) and the second installment in The Dark Knight Trilogy. In the film's plot, the superhero vigilante Batman, Police Lieutenant James Gordon and District Attorney Harvey Dent form an alliance to dismantle organized crime in Gotham City, but their efforts are derailed by the intervention of an anarchistic mastermind, the Joker, who seeks to test how far Batman will go to save the city from complete chaos.",    
        "Genre": {
            "Name":"Drama",
            "Description":"In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
        }, 
        "Director": {
            "Name":"Christopher Nolan",
            "Bio":"Christopher Nolan[1] CBE (/ˈnoʊlən/; born 30 July 1970) is a British-American film director, producer, and screenwriter. His films have grossed more than US$5 billion worldwide, and have garnered 11 Academy Awards from 36 nominations."
        },
    },  
    {
        "title":"The Ritual",
        "Description":"The Ritual is a 2017 British horror film directed by David Bruckner and written by Joe Barton. It stars Rafe Spall, Arsher Ali, Robert James-Collier, and Sam Troughton. The film is based on the 2011 novel The Ritual by Adam Nevill.",    
        "Genre": {
            "Name":"Horror",
            "Description":"Horror is a genre of speculative fiction which is intended to frighten, scare, or disgust.[1] Literary historian J. A. Cuddon defined the horror story as a piece of fiction in prose of variable length... which shocks, or even frightens the reader, or perhaps induces a feeling of repulsion or loathing."
        }, 
        "Director": {
            "Name":"David Bruckner",
            "Bio":"David Bruckner (born c. 1977) is an American film director. With Jacob Gentry and Dan Bush, he co-wrote and co-directed The Signal (2007). He has also co-written and directed Amateur Night in the horror anthology V/H/S, and directed The Night House."
        },
    },  
    {
        "title":"Gangs of New York", 
        "Description":"Gangs of New York is a 2002 American historical drama film directed by Martin Scorsese and written by Jay Cocks, Steven Zaillian and Kenneth Lonergan, based on Herbert Asbury's 1927 book The Gangs of New York.[5] The film stars Leonardo DiCaprio, Daniel Day-Lewis and Cameron Diaz, with Jim Broadbent, John C. Reilly, Henry Thomas, Stephen Graham, Eddie Marsan and Brendan Gleeson in supporting roles.",    
        "Genre": {
            "Name":"Drama",
            "Description":"In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
        }, 
        "Director": {
            "Name":"Martin Scorsese",
            "Bio":"Martin Charles Scorsese (/skɔːrˈsɛsi/;[2] Italian: [skorˈseːze, -se]; born November 17, 1942) is an American film director, producer, and screenwriter. He is the recipient of many accolades, including an Academy Award, three Primetime Emmy Awards, a Grammy Award, four British Academy Film Awards, three Golden Globe Awards, and two Directors Guild of America Awards."
        },
    },  
    {
        "title":"Once Upon A Time In Hollywood",
        "Description":"Once Upon a Time in Hollywood[a] is a 2019 comedy-drama film written and directed by Quentin Tarantino. Produced by Columbia Pictures, Bona Film Group, Heyday Films, and Visiona Romantica and distributed by Sony Pictures Releasing, it is a co-production between the United States, United Kingdom, and China. It features a large ensemble cast led by Leonardo DiCaprio, Brad Pitt, and Margot Robbie. Set in 1969 Los Angeles, the film follows a fading actor and his stunt double as they navigate the rapidly changing film industry, with the looming threat of the Tate murders hanging overhead.",    
        "Genre": {
            "Name":"Action",
            "Description":"Action fiction is a form of genre fiction whose subject matter is characterized by emphasis on exciting action sequences. This does not always mean they exclude character development or story-telling."
        }, 
        "Director": {
            "Name":"Quentin Tarantino",
            "Bio":"Quentin Jerome Tarantino (/ˌtærənˈtiːnoʊ/; born March 27, 1963)[1] is an American filmmaker, actor, film critic and author. His films are characterized by frequent references to popular culture and film history, nonlinear storylines, dark humor, stylized violence, extended dialogue, pervasive use of profanity, cameos and ensemble casts."
        },
    },

];

// POST adding new user

app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('Users need names');
    }
})

// UPDATE to add new user (=== is exactly equal to something where == is "truthy" and a user.id(string) is "equal" to id(number))
// but if it's comparing e.g. string to string you can use stricked equality i.e. === or !==

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('No such user')
    }
})

// CREATE updating users favorite movies list (` vs ' so you can add apostrophe in the middle of strings)

app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    

    let user = users.find( user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send('No such user')
    }
})

// DELETE allow users to remove a movie from list of favorites

app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(400).send('No such user')
    }
})

// DELETE user

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        users = users.filter( user => user.id != id);
        res.status(200).send(`user ${id} has been deleted`);
    } else {
        res.status(400).send('No such user')
    }
})

// READ to get WHOLE movie list

app.get('/movies', (req, res) => {
    res.status(200).json(movies);
})

//READ to get movie title

app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('No such movie exists in this API');
    }
})

//READ to get genre

app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('No such genre exists in this API');
    }
})

//READ to get director

app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.Director.Name === directorName ).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('No such director exists in this API');
    }
})


app.listen(8080, () => console.log('listening on port 8080'));