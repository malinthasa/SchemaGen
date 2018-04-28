let http = require('http');
let fs = require('fs');
let path = require('path');

// Server creating function
http.createServer(function (request, response) {
    console.log('Got a request to the server');


    let filePath = '.' + request.url;
    if (filePath === './')
        filePath = './index.html';

    let extensionType = path.extname(filePath);
    let contentType = 'text/html';
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
            response.writeHead(200, {'Content-Type': contentType});
            response.end(data, 'utf-8');
        }
    });

}).listen(8079);
