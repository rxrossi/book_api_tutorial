import express from "express";
import bodyParser from "body-parser";
import database from "./config/database";
import booksRouter from './routes/books';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import authorization from '../auth';

const app = express();

const configureExpress = () => {
	app.use(bodyParser.json());

	const auth = authorization(app);
	app.use(auth.initialize());
	app.auth = auth;

	booksRouter(app);
	usersRouter(app);
	authRouter(app);
	return app;
}


export default () => database.connect().then(configureExpress)


