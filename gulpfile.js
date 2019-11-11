const gulp = require("gulp");
const shell = require("shelljs");
const path = require("path");
const commander = require("commander");

const protocBuild = cb => {
	shell.mkdir("-p", path.join(__dirname, ".generated"));
	shell.exec(
		`${path.join(
			__dirname,
			"node_modules",
			".bin",
			"grpc_tools_node_protoc"
		)} --js_out=import_style=commonjs,binary:.generated --grpc_out=.generated --plugin=protoc-gen-grpc=${path.join(
			__dirname,
			"node_modules",
			".bin",
			"grpc_tools_node_protoc_plugin"
		)} -I${path.join(__dirname, "src", "lib", "proto")} ${path.join(
			__dirname,
			"src",
			"lib",
			"proto",
			"math.proto"
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

	shell.mkdir("-p", path.join(__dirname, ".bin"));

	const target = commander.platform === "darwin" ? "macos" : "linux";
	const architecture = "x64";

	shell.exec(
		`${path.join(
			__dirname,
			"node_modules",
			".bin",
			"pkg"
		)} ${path.join(
			__dirname,
			"src",
			"cmd",
			"server",
			"math"
		)} --target ${target}-${architecture} --output ${path.join(
			__dirname,
			".bin",
			`math-grpc-node-server-${commander.platform}-${commander.architecture}`
		)}`
	);

	shell.cp(
		path.join(
			__dirname,
			"node_modules",
			"grpc",
			"src",
			"node",
			"extension_binary",
			"*",
			"grpc_node.node"
		),
		path.join(
			__dirname,
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
			__dirname,
			".bin",
			`grpc_node.node-${commander.platform}-${commander.architecture}`
		),
		path.join("/usr", "local", "bin", "grpc_node.node")
	);
	shell.cp(
		path.join(
			__dirname,
			".bin",
			`math-grpc-node-server-${commander.platform}-${commander.architecture}`
		),
		path.join("/usr", "local", "bin", "math-grpc-node-server")
	);

	cb();
};

const clean = cb => {
	shell.rm("-rf", path.join(__dirname, ".bin"));
	shell.rm("-rf", path.join(__dirname, ".generated"));

	cb();
};

const run = cb => {
	shell.exec(path.join(__dirname, "src", "cmd", "server", "math"));

	cb();
};

const watch = () => {
	gulp.watch(
		[
			"./src/cmd/**/*",
			"./src/lib/svc/*.js",
			"./src/lib/proto/*.proto"
		],
		gulp.series(protocBuild, run)
	);
};

exports.default = protocBuild;
exports.protocBuild = protocBuild;
exports.pkgBuildBinary = pkgBuildBinary;
exports.pkgInstallBinary = pkgInstallBinary;
exports.clean = clean;
exports.run = run;
exports.watch = gulp.series(protocBuild, watch);
