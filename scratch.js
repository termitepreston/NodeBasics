/**
 * modern JavaScript, i.e., ES6
 */

const user = {
	name: "Alice",
	address: {
		city: "Wonderland",
	},
};

const {
	address: { city },
} = user;

console.log(`Alice in ${city}.`);

const fruits = ["apple", "banana"];
const moreFruits = [...fruits, "orange"];

console.info(moreFruits);

const [first, second, ...rest] = [1, 2, 3, 4, 5, 6, 7];

console.log(`rest = ${JSON.stringify(rest, null, 2)}`);

/** class based OOP in ES6 */
class Person {
	constructor(name) {
		this._name = name;
	}

	get name() {
		return this._name.toUpperCase();
	}

	set name(newName) {
		this._name = newName;
	}

	greet() {
		console.log(`Hi! I'm ${this.name}...`);
	}
}

class Student extends Person {
	static info() {
		console.log("CLASS::Person");
	}

	constructor(name, grade) {
		super(name);
		this.grade = grade;
	}

	study() {
		console.log(`${this.name} is studying in grade ${this.grade}.`);
	}
}

const sarah = new Person("Sarah");
sarah.greet();

const bob = new Student("Bob", "12");
bob.greet();
bob.study();

Student.info();

const wonkyService = new Promise((resolve, reject) => {
	setTimeout(() => {
		if (Math.random() > 0.5) {
			resolve("{ result: 42 }");
		} else {
			reject("{ error: 502 }");
		}
	}, 4000);
});

wonkyService
	.then((r) => console.log(r))
	.catch((e) => console.log(e))
	.finally(() => console.log("Service call finished!"));
