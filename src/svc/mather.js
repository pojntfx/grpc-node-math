const grpc = require("grpc");
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
		return callback({
			message: "Could not add, `First` has not been provided",
			status: grpc.status.INVALID_ARGUMENT
		});
	}
	if (!call.request.getSecond() === 0) {
		return callback({
			message:
				"Could not add, `Second` has not been provided",
			status: grpc.status.INVALID_ARGUMENT
		});
	}

	// Log progress
	console.log(
		"Adding",
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
		return callback({
			message: "Could not add, `First` has not been provided",
			status: grpc.status.INVALID_ARGUMENT
		});
	}
	if (!call.request.getSecond() === 0) {
		return callback({
			message:
				"Could not add, `Second` has not been provided",
			status: grpc.status.INVALID_ARGUMENT
		});
	}

	// Log progress
	console.log(
		"Subtracting",
		call.request.getFirst(),
		"from",
		call.request.getSecond()
	);

	// Return subtracted numbers
	const reply = new MathSubtractReply();
	reply.setResult(
		subtract(call.request.getFirst(), call.request.getSecond())
	);
	callback(null, reply);
};
