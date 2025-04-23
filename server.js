// According to dotenv docs, in ES6 mode, this will simultaneous load and configure dotenv. No further code needed.
import "dotenv/config";
import express from "express";
import process from "node:process";
import { connectDBMongoose } from "./db.js";
import Student from "./models/Students.js";

import debug from "debug";

const userDbg = debug("app:user");

// All the code here documented using JSDoc.
const PORT = process.env.APP_PORT ?? 3000;

const mongoUri =
	"mongodb://localhost:27017/HighSchool?retryWrites=true&w=majority";

await connectDBMongoose(mongoUri);

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/students", async (req, res, next) => {
	try {
		const users = await Student.find();
		res.json(users);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server error.");
	}
});

app.get("/students/:id", (req, res, next) => {
	const studId = Number.parseInt(req.params.id);
	const stud = Student.find({
		_id: studId,
	});

	if (!stud) {
		const err = new Error("Student not found!");
		err.status = 404;
		return next(err);
	}

	userDbg("Student: ", stud);

	res.json(stud);
});

app.delete("/students/:id", (req, res, next) => {
	const studId = Number.parseInt(req.params.id);
});

app.post("/students", async (req, res, next) => {
	try {
		const newStud = await Student.create({
			...req.body,
		});

		res.status(200).json(newStud).end();
	} catch (error) {
		return next(error);
	}
});

app.use(/(.*)/, (req, res, next) => {
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
