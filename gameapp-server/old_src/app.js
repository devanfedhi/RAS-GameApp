const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const setupSocketServer = require('./server');

app.use(cors());

const server = http.createServer(app);

setupSocketServer(server);

server.listen(4001, () => {
  console.log('listening on *:4001');
});
