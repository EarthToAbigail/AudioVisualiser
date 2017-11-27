const http = require('http');
const router = require('./router');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;

http.createServer(router).listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
