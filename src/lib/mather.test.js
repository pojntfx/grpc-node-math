const mather = require("./mather");

const addResults = [
	[0, 0, 0],
	[0, 1, 1],
	[1, 0, 1],
	[1, 1, 2],
	[-1, 1, 0],
	[1, -1, 0],
	[-1, -1, -2]
];

const subtractResults = [
	[0, 0, 0],
	[1, 0, -1],
	[0, 1, 1],
	[-1, 0, 1],
	[-1, -1, 0],
	[1, -1, -2]
];

test("Adds", () =>
	Promise.all(
		addResults.map(([x, y, e]) => expect(mather.add(x, y)).toBe(e))
	));

test("Subtracts", () =>
	Promise.all(
		subtractResults.map(([x, y, e]) =>
			expect(mather.subtract(x, y)).toBe(e)
		)
	));
