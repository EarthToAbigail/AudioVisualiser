const fs = require('fs');
const path = require('path');

const handleError = (err, res) => {
  console.log(err);
  const message = 'Sorry, there was an error on our side...';
  res.writeHead(500, { 'Content-Type': 'text/html' });
  res.end(`<h1>${message}</h1>`);
};

const handleHome = (req, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');

  fs.readFile(filePath, (err, file) => {
    if (err) {
      handleError(err, res);
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(file);
  });
};

const handleMusic = (req, res) => {
  const file = req.url.split('=')[1];

  // if (file.indexOf('Choose') > -1) {
  //   res.writeHead(307, { Location: '/' });
  // } else {
    const filePath = path.join(__dirname, '..', 'music', file);
    const stats = fs.statSync(filePath);

    res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Content-Length': stats.size,
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  // }
};

const handlePublic = (req, res) => {
  const types = {
    html: 'text/html',
    js: 'application/javascript',
    css: 'text/css',
    ico: 'image/x-icon',
    mp3: 'audio/mpeg',
  };

  const filePath = path.join(__dirname, '..', 'public', req.url);
  const ext = filePath.split('.')[1];

  fs.readFile(filePath, (err, file) => {
    if (err) {
      handleError(err, res);
    }
    res.writeHead(200, { 'Content-Type': types[ext] });
    res.end(file);
  });
};

module.exports = {
  handleHome,
  handleMusic,
  handlePublic,
};
