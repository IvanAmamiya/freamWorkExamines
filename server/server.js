const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath;
  if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(__dirname, '../src/index.html');
  } else if (req.url.startsWith('/src/')) {
    filePath = path.join(__dirname, '..', req.url);
  } else if (req.url.startsWith('/server/')) {
    filePath = path.join(__dirname, '..', req.url);
  } else if (req.url.startsWith('/recruit/')) {
    filePath = path.join(__dirname, '..', req.url);
  } else {
    // 兼容根目录下的 js/css 等
    filePath = path.join(__dirname, '..', req.url);
  }
  const extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.pdf':
      contentType = 'application/pdf';
      break;
    case '.md':
      contentType = 'text/markdown';
      break;
    case '.html':
      contentType = 'text/html';
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`, 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});