'use strict';

const server = require('http').createServer((req, res) => {
  req.socket.ref();
  res.write('Hello World!');
  res.end(() => req.socket.unref());
});
server.on('connection', (socket) => socket.unref());
server.listen(80);
process.stdout.write('http-hello-world is listening\n');
const terminate = () => {
  process.stdout.write('http-hello-world is terminating\n');
  server.close(process.exit)
};
process.on('SIGINT', terminate);
process.on('SIGTERM', terminate);
