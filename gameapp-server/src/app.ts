import express, { Express } from "express";
import http from 'http';
import cors from 'cors';
import setupSocketServer from './server';

const app: Express = express();

app.use(cors());

const server = http.createServer(app);

setupSocketServer(server);

server.listen(4001, () => {
  console.log('Socket server listening on *:4001');
});