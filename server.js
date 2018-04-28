let http = require('http');
let fs = require('fs');
let path = require('path');

// Server creating function
http.createServer(function (request, response) {
    console.log('Got a request to the server');


    let filePath = '.' + request.url;
    if (filePath === './')
        filePath = './index.html';
    //check extension of the file to be accessed
    let extensionType = path.extname(filePath);
    let contentType = 'text/html';
    //select content type based on the extension
    switch (extensionType) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }

    fs.readFile(filePath, function (error, data) {
        if (error) {
            if (error) {
                response.writeHead(404);
                response.write('File not found')
            }
        }
        else {
            //open file
            response.writeHead(200, {'Content-Type': contentType});
            response.end(data, 'utf-8');
        }
    });
// You can change the server running port here
}).listen(8080);
