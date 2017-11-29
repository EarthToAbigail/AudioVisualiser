const { handleHome, handleMusic, handlePublic } = require('./handler');

function router(req, res) {

  let url = req.url;

  if (url === '/') {
    handleHome(req, res);
  }
  // else if (url.split('.')[1] === 'mp3') {
  else if (url.split('?')[0] === '/submit') {
    handleMusic(req, res);
  }
  else {
    handlePublic(req, res);
  }
}

module.exports = router;
