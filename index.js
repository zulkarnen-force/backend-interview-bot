import express from 'express';
import expressConfig from './frameworks/webserver/express.js';
import http from 'http'
import serverConfig from './frameworks/webserver/server.js';
import mongoDbConnection from './frameworks/database/mongoDB/connection.js';
import mongoose from 'mongoose';
import config  from './config/config.js';
import routes from './frameworks/webserver/routes/index.js';




const app = express();
const server = http.createServer(app);

expressConfig(app);

// server configuration and start
serverConfig(app).startServer();

// DB configuration and connection create

mongoDbConnection(mongoose, config).connectToMongo();

routes(app, express)