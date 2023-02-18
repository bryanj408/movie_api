//import express module to use locally
const express = require('express');
//used to route HTTP requests and responses
const app = express();
const http = require('http');

http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Welcome to my book club!\n');
}).listen(8080);

console.log('My first node test is running on port 8080.');




















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
