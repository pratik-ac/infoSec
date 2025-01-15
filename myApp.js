const express = require('express');
const app = express();
const helmet = require('helmet');

// * Hackers can exploit known vulnerabilities in Express/Node if they see that your site is powered by Express.
// * X-Powered-By: Express is sent in every request coming from Express by default.
// * Use the helmet.hidePoweredBy() middleware
app.use(
  helmet.hidePoweredBy({
    setTo: 'PHP 4.2.0',
  })
);

module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
