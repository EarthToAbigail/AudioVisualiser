const { handleHome, handleMusic, handlePublic } = require('./handler');

function router(req, res) {

  let url = req.url;

  if (url === '/') {
    handleHome(req, res);
  }
  else if (url === '/AlteredReality.mp3') {
    handleMusic(req, res);
  }
  else {
    handlePublic(req, res);
  }
}

module.exports = router;
