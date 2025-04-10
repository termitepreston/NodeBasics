// According to dotenv docs, in ES6 mode, this will simultaneous load and configure dotenv. No further code needed.
import "dotenv/config";
import express from "express";
import process from "node:process";
import { getUserById } from "./db.js";

// All the code here documented using JSDoc.
const PORT = process.env.APP_PORT ?? 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/user/:id", (req, res, next) => {
	const userId = Number.parseInt(req.params.id);
	const user = getUserById(userId);

	if (!user) {
		const err = new Error("User not found!");
		err.status = 404;
		return next(err);
	}

	res.json(user);
});

app.use("*", (req, res, next) => {
	const err = new Error(`Path '${req.originalUrl}' not found!`);
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		statusCode: err.status || 500,
		reason: err.message || "Internal Server Error",
	});
});

app.listen(PORT, () =>
	console.log(`Server started on http://localhost:${PORT}.`),
);
