'use strict';

const server = require('http').createServer((req, res) => {
  req.socket.ref();
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify({service: 'ztest-simple-api', now: (new Date()).toISOString()}));
  res.end(() => req.socket.unref());
});
server.on('connection', (socket) => socket.unref());
server.listen(80);
process.stdout.write('ztest-simple-api is listening\n');
const terminate = () => {
  process.stdout.write('ztest-simple-api is terminating\n');
  server.close(process.exit)
};
process.on('SIGINT', terminate);
process.on('SIGTERM', terminate);
