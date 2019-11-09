const { series } = require("gulp");
const shell = require("shelljs");
const path = require("path");
const pkg = require("pkg");
const commander = require("commander");

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

const pkgBuildBinary = cb => {
	commander.option(
		"-p, --platform <platform>",
		"Platform to build the binary for"
	);
	commander.option(
		"-a, --architecture <architecture>",
		"Architecture to build the binary for"
	);
	commander.parse(process.argv);

	shell.mkdir("-p", ".bin");

	const target = commander.platform === "darwin" ? "macos" : "linux";
	const architecture = "x64";

	shell.exec(
		`${path.join("node_modules", ".bin", "pkg")} ${path.join(
			"src",
			"cmd",
			"server",
			"math"
		)} --target ${target}-${architecture} --output ${path.join(
			".bin",
			`math-grpc-node-server-${commander.platform}-${commander.architecture}`
		)}`
	);

	shell.cp(
		path.join(
			"node_modules",
			"grpc",
			"src",
			"node",
			"extension_binary",
			"*",
			"grpc_node.node"
		),
		path.join(
			".bin",
			`grpc_node.node-${commander.platform}-${commander.architecture}`
		)
	);

	cb();
};

exports.default = protocBuild;
exports.protocBuild = protocBuild;
exports.pkgBuildBinary = pkgBuildBinary;
