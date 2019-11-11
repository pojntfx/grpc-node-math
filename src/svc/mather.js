const {
	MathAddReply,
	MathSubtractReply
} = require("../proto/generated/mather_pb");
const { add, subtract } = require("../lib/mather");

/**
 * Add two numbers
 */
module.exports.add = (call, callback) => {
	// Validate input
	if (call.request.getFirst() === 0) {
		console.error("could not add, `First` has not been provided");
	}
	if (!call.request.getSecond() === 0) {
		console.error("could not add, `Second` has not been provided");
	}

	// Log progress
	console.log(
		"adding",
		call.request.getFirst(),
		"to",
		call.request.getSecond()
	);

	// Return added numbers
	const reply = new MathAddReply();
	reply.setResult(add(call.request.getFirst(), call.request.getSecond()));
	callback(null, reply);
};

/**
 * Subtract two numbers
 */
module.exports.subtract = (call, callback) => {
	// Validate input
	if (call.request.getFirst() === 0) {
		console.error(
			"could not subtract, `First` has not been provided"
		);
	}
	if (!call.request.getSecond() === 0) {
		console.error(
			"could not subtract, `Second` has not been provided"
		);
	}

	// Log progress
	console.log(
		"subtracting",
		call.request.getSecond(),
		"from",
		call.request.getFirst()
	);

	// Return subtracted numbers
	const reply = new MathSubtractReply();
	reply.setResult(
		subtract(call.request.getFirst(), call.request.getSecond())
	);
	callback(null, reply);
};
