import mongoose from "mongoose";

const StudentsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		set: (val) => val.trim(),
	},
	grade: {
		type: String,
		default: "N/A",
	},
	age: {
		type: Number,
		validate: {
			validator: (v) => v >= 18 && v <= 65,

			message: (props) =>
				`${props.value} is not a valid age. Must be between 18 and 65. (Reason: ${props.path})`,
		},
	},
	interests: {
		type: [String],
		default: ["Movie watching"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	phone: {
		type: String,
		match: [/^\+\d{3}-\d{9}/, "Phone not a correct format."],
		required: true,
	},

	email: {
		type: String,
		match: [
			/^[A-Za-z0-9+-.]{4,30}@(hilcoe|gmail|yahoo)\.com$/,
			"Does not conform to a valid email schema.",
		],
	},
});

export default mongoose.model("Student", StudentsSchema);
