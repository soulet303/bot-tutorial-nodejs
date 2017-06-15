var http, director, cool, bot, router, server, port;

http        = require('http');
director    = require('director');
cool        = require('cool-ascii-faces');
bot         = require('./bot.js');

router = new director.http.Router({
  '/' : {
    post: bot.respond,
    get: ping
  }
});

server = http.createServer(function (req, res) {
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
});

port = Number(process.env.PORT || 5000);
server.listen(port);

function ping() {
  this.res.writeHead(200);
  this.res.end("(1:1): Jad said, let there be fog. Vape was born. Jad said, let there be drugs. Drugs were born. (1:2) Jad snorted a line of cocaine and said, What the fuck did you just say, you looking at me funny? Hehe just kidding. (1:3): His cock shined like the stars above, as it ripped through many layers of weatherstriken cellulite. The luminosity created lit a great ball of fire into the sky, and he said all is good, the third day.");
}
