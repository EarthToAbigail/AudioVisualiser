const fs = require('fs');
const path = require('path');

function handleError(err) {
  console.log(err);
  let message = "Sorry, there was an error on our side...";
  res.writeHead(500, {'Content-Type': 'text/html'});
  res.end(`<h1>${message}</h1>`)
}

function handleHome(req, res) {

    let filePath = path.join(__dirname, 'index.html');

    fs.readFile(filePath, (err, file) => {
      if (err) {
        handleError(err);
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(file);
    });
}

function handleMusic(req, res) {
    let filePath = path.join(__dirname, 'AlteredReality.mp3');
    let stats = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stats.size
    });

    let readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
}

function handlePublic(req, res) {

    let types = {
      js: 'application/javascript',
      css: 'text/css'
    };

    let filePath = path.join(__dirname, req.url);
    console.log(filePath);

    let ext = filePath.split('.')[1];

    fs.readFile(filePath, (err, file) => {
      if (err) {
        handleError(err);
      }
      res.writeHead(200, {'Content-Type': types[ext]});
      res.end(file);
    })
}


module.exports = {
  handleHome, handleMusic, handlePublic
}
