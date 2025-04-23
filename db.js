import mongoose from "mongoose";

export async function connectDBMongoose(uri) {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		mongoose.connection.on("error", (err) => console.error(err));
	} catch (err) {
		console.error(`DB connection error: Reason: ${err.message}`);
		process.exit(1);
	}
}

// export async function mongoNative(uri) {
// 	const client = new MongoClient(uri, mongoOpts);

// 	try {
// 		await client.connect();

// 		const db = client.db("HighSchool");

// 		const students = db.collection("students");

// 		const result = await students.insertOne({
// 			name: "Mark",
// 			grade: "B",
// 		});

// 		console.log(`Inserted ID: ${result.insertedId}`);

// 		// Find all students and print them:

// 		const allStudents = await students.find({}).toArray();

// 		console.log("\n\nAll students in collection: ");

// 		for (const s of allStudents) {
// 			console.log(`{ Id: ${s._id}, Name: ${s.name}, Grade: ${s.grade} }`);
// 		}
// 	} catch (err) {
// 		console.error(`Failed to write to db. Reason: ${err.message}`);
// 	} finally {
// 		await client.close();
// 	}
// }

// const userSchema = new mongoose.Schema({
// 	name: {
// 		type: String,
// 		required: true,
// 		trim: true,
// 	},
// 	grade: {
// 		type: String,
// 		required: true,
// 	},
// });

// mongoNative(mongoUri).catch(console.dir);
