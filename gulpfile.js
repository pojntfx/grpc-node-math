const { series } = require("gulp");
const shell = require("shelljs");
const path = require("path");

const protocBuild = cb => {
	shell.mkdir("-p", ".generated");
	shell.exec(
		`${path.join(
			"node_modules",
			".bin",
			"grpc_tools_node_protoc"
		)} --js_out=import_style=commonjs,binary:.generated --grpc_out=.generated --plugin=protoc-gen-grpc=${path.join(
			"node_modules",
			".bin",
			"grpc_tools_node_protoc_plugin"
		)} ${path.join("src", "lib", "proto", "math.proto")}`
	);
	cb();
};

exports.default = protocBuild;
exports.protocBuild = protocBuild;
