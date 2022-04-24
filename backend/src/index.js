import express from "express";
import cors from "cors";
import http from "http";
import config from "./config";
import dbg from "debug";
import pool from "./data/dbconn";
import login from "./routes/login";
import signup from "./routes/signup";
import admin from "./routes/admin/admin";
import bookRoute from "./routes/bookRoute";
import findFastestRoute from "./routes/findFastestRoute";
import trackRoute from "./routes/trackRoute";
import token from "./routes/token";
const debug = dbg("http");
const app = express();
const { json } = express;
app.use(express.json());

app.use(cors());

app.use(json({ extended: false }));

app.use(
	"/api",
	login,
	signup,
	admin,
	findFastestRoute,
	bookRoute,
	token,
	trackRoute
);
const server = http.createServer(app);
server.listen(config.PORT, config.HOST_NAME, () => {
	debug(`✨✨ Server running at http://${config.HOST_NAME}:${config.PORT}:`);
});
