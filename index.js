const express = require('express'),
    app = express();

const movieObject = [
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

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Welcome to the home page baby');
});

app.get('/movies', (req, res) => {
    res.json(movieObject);
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080');
});
















//app.use() is how you invoke your middleware functions
// the common parameter here specifies that requests should be logged using Morang's 
//"common" format, which logs basic data such as IP address, time of request, request method
//and path, as well as the status code that was sent back as a repsonse. 
//app.use(morgan('common'));

//creat a write stream (in append mode)
//a 'log.txt' file is created in a root directory
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

// //setup the logger
// app.use(morgan('combined', {stream: accessLogStream}));

// app.get('/', (req, res) => {
//     res.send('Welcome to my app!');
// });

// app.get('/secreturl', (req, res) => {
//     res.send('This is a super secret file');
// });

// app.listen(8080, () => {
//     console.log('Your app is listening on port 8080');
// });















//NOT NEEDED BUT WANT FOR REFERENCE//

// //imported http module to create server
// const http = require('http'),
//     fs = require('fs'),
//     url = require('url');

// //built-in function, createServer from http module
// http.createServer((request, response) => {
//     let addr = request.url,
//         q = url.parse(addr, true),
//         filePath = '';

//     //appendFile() appends something to a file's content rather than overwriting it
//     //adding url and timestamp everytime someone requests from server
//     fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
//         if (err) {
//             console.log(err);
//         } else { 
//             console.log('Added to log.');
//         }
//     });

//     //looks for pathname or defaults to home page if filepath can't be found
//     if (q.pathname.includes('documentation')) {
//         filePath = (__dirname + '/documentation.html');
//     } else {
//         filePath = 'index.html';
//     }

//     fs.readFile(filePath, (err, data) => {
//         if (err) {
//             throw err;
//         }

//         response.writeHead(200, {'Content-Type': 'text/plain'});
//         response.write(data);
//         response.end();
//     });
// }).listen(8080);
// console.log('My test server is running on port 8080');
