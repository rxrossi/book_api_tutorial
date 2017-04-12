import express from "express";
import bodyParser from "body-parser";
import database from "./config/database";
import booksRouter from './routes/books';

const app = express();

const configureExpress = () => {
	app.use(bodyParser.json());
	booksRouter(app);
	return app;
}


export default () => database.connect().then(configureExpress)

