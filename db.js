const users = [
	{
		id: 1,
		firstName: "John",
		lastName: "Doe",
		age: 28,
	},
	{
		id: 2,
		firstName: "Jane",
		lastName: "Doe",
		age: 32,
	},
];

export function getUserById(id) {
	const us = users.filter((u) => u.id === id);

	return us.length === 0 ? null : us.pop();
}
