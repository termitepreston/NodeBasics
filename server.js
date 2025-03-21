// According to dotenv docs, in ES6 mode, this will simultaneous load and configure dotenv. No further code needed.
import "dotenv/config";
import * as http from "node:http";
import * as fs from "node:fs/promises";
import express from "express";
import process from "node:process";

// All the code here documented using JSDoc.

/* UTILITY FUNCTIONS */
/**
 * Info logging function.
 * @param {string} message The message to be logged.
 */
function info(message) {
	console.info(
		`[${process.env.APP_NAME}] [INFO] [${(new Date()).toISOString()}] ${message}`,
	);
}

/**
 * Error logging function.
 * @param {string} message The message to be logged.
 */
function error(message) {
	console.error(
		`[${process.env.APP_NAME}] [ERROR] [${(new Date()).toISOString()}] ${message}.`,
	);
}

/**
 * Reads a file asynchronously using async/await.
 * @param {string} path The path of the file to be read.
 * @returns {string} Contents of the file.
 */
async function readFileAsyncAwait(path) {
	const rPath = new URL(path, import.meta.url);
	try {
		const contents = await fs.readFile(rPath, { encoding: "utf-8" });

		return contents;
	} catch (err) {
		throw new Error(`Failed to read file. Reason: ${err.message}`);
	}
}

/**
 * Reads a file asynchronously using promises.
 * @param {string} path The path of the file to be read.
 * @returns {string} Contents of the file.
 */
async function readFilePromises(path) {
	// A more robust way to resolve paths.
	// rPath = file://Absolute/Path/to/the/file.extension
	const rPath = new URL(path, import.meta.url);

	fs.readFile(rPath, { encoding: "utf-8" })
		.then((contents) => {
			return contents;
		})
		.catch((err) => {
			throw new Error(`Failed to read file. Reason: ${err}`);
		})
		.finally(() => {
			// Clean-up code goes here.
		});
}

/**
 * @description Create and run a simple http server.
 * @param {string} [host=process.env.APP_HOST || "localhost"] The address to bind this server to.
 * @param {number} [port=process.env.APP_PORT || 3000] The port to bind this server to.
 */
function createAndRunServer(host, port) {
	const server = http.createServer(async (req, res) => {
		// Load the template

		res.statusCode = 200;
		res.setHeader("Content-Type", "text/html");

		try {
			const contents = await readFileAsyncAwait("HelloWorld.html");
			res.end(contents);
		} catch (err) {
			res.statusCode = 500; // Internal server error.
			res.end(`Error encountered: ${err.message}`);
			error(`Error encountered: ${err.message}`);
		}
	});

	// host:port
	const h = host || process.env.APP_HOST || "localhost";
	const p = port || process.env.APP_PORT || 3000;

	server.listen(p, h, () => {
		info(
			`Server is running at http://${h}:${p}. Enter 'rs' to reload manually...`,
		);
	});
}

function runExpress() {
	const PORT = process.env.APP_PORT ?? 3000;

	const app = express();

	app.use(express.urlencoded({ extended: true }));

	app.get("/:name", (req, res) => {
		const { name } = req.params;
		res
			.status(200)
			.set("Content-Type", "text/html")
			.send(`<h1>Hello, ${name ?? "there"}!`);
	});

	app.use((req, res) => {
		res.status(404).send("Not found!");
	});

	const server = app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}.`);
	});

	const shutdown = async (signal) => {
		console.log(`Received signal: ${signal}, shutting down gracefully.`);
		await new Promise((resolve) => server.close(resolve));
		console.log("Server closed.");
		process.exit(0);
	};

	process.on("SIGINT", () => shutdown("SIGINT"));
	process.on("SIGTERM", () => shutdown("SIGTERM"));
}

// createAndRunServer();

runExpress();
