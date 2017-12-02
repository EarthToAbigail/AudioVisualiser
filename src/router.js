const { handleHome, handleMusic, handlePublic } = require('./handler');

const router = (req, res) => {
  const url = req.url;

  if (url === '/') {
    handleHome(req, res);
  } else if (url.split('?')[0] === '/submit') {
    handleMusic(req, res);
  } else {
    handlePublic(req, res);
  }
};

module.exports = router;
