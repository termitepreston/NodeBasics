import { add, area } from "./math.js";
import * as fs from "node:fs/promises";

console.log(
	`[INFO] Area of circle with a radius of 6 is ${area(6).toFixed(3)}.`,
);

for (let i = 0; i < 10; i++) {
	console.log(`[INFO] i + i = ${add(i, i).toString().padStart(2, "0")}.`);
}

try {
	const data = await fs.readFile("./package.json");

	console.log(`FILE:\n${data}\nEND`);
} catch (error) {
	console.log(`Error! reason: ${error.message}`);
}
