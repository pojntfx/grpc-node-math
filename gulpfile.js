const { series } = require("gulp");
const shell = require("shelljs");
const path = require("path");
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

const nccBuild = async cb => {
	shell.mkdir("-p", ".build");
	shell.exec(
		`${path.join(
			"node_modules",
			".bin",
			"ncc"
		)} build --out ${path.join(".build", "index.js")} ${path.join(
			"src",
			"cmd",
			"server",
			"math"
		)}`
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

const pkgInstallBinary = cb => {
	commander.option(
		"-p, --platform <platform>",
		"Platform to build the binary for"
	);
	commander.option(
		"-a, --architecture <architecture>",
		"Architecture to build the binary for"
	);
	commander.parse(process.argv);

	shell.cp(
		path.join(
			".bin",
			`grpc_node.node-${commander.platform}-${commander.architecture}`
		),
		path.join("/usr", "local", "bin", "grpc_node.node")
	);
	shell.cp(
		path.join(
			".bin",
			`math-grpc-node-server-${commander.platform}-${commander.architecture}`
		),
		path.join("/usr", "local", "bin", "math-grpc-node-server")
	);

	cb();
};

const clean = cb => {
	shell.rm("-rf", ".bin");
	shell.rm("-rf", ".build");
	shell.rm("-rf", ".generated");

	cb();
};

const run = cb => {
	shell.exec(path.join(".build", "index.js", "index.js"));

	cb();
};

exports.default = protocBuild;
exports.protocBuild = protocBuild;
exports.nccBuild = nccBuild;
exports.pkgBuildBinary = pkgBuildBinary;
exports.pkgInstallBinary = pkgInstallBinary;
exports.clean = clean;
exports.run = run;
