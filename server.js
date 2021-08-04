const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((req, res) => {
    let filePath = '.' + req.url
    if (filePath == './') {
        filePath = './index.html';
    }
    if (filePath == './about') {
        filePath = './about.html';
    }
    const ext = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };
    let contentType = mimeTypes[ext] || 'application/octet-stream'

    fs.readFile(filePath, (err, content) => {
        if (err) {
            // no such file or directory error handler
            if (err.code == 'ENOENT') {
                fs.readFile('./404.html', (err, data) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(data, 'utf-8');
                });
            }
            // some internal server error handler
            else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        } else {
            // success handler
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    }) 
})


const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Server listening on port ${port}`));