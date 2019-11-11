const gulp = require("gulp");
const shell = require("shelljs");
const path = require("path");
const commander = require("commander");
const nodemon = require("gulp-nodemon");

const GENERATED_PROTO_DIR = path.join(__dirname, "src", "proto", "generated");

const protocBuild = cb => {
	shell.mkdir("-p", GENERATED_PROTO_DIR);
	shell.exec(
		`${path.join(
			__dirname,
			"node_modules",
			".bin",
			"grpc_tools_node_protoc"
		)} --js_out=import_style=commonjs,binary:${GENERATED_PROTO_DIR} --grpc_out=${GENERATED_PROTO_DIR} --plugin=protoc-gen-grpc=${path.join(
			__dirname,
			"node_modules",
			".bin",
			"grpc_tools_node_protoc_plugin"
		)} -I${path.join(__dirname, "src", "proto")} ${path.join(
			__dirname,
			"src",
			"proto",
			"mather.proto"
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
			"cmd",
			"mather.js-server",
			"mather.js-server"
		)} --target ${target}-${architecture} --output ${path.join(
			__dirname,
			".bin",
			`mather.js-server-${commander.platform}-${commander.architecture}`
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
			`mather.js-server-${commander.platform}-${commander.architecture}`
		),
		path.join("/usr", "local", "bin", "mather.js-server")
	);

	cb();
};

const clean = cb => {
	shell.rm("-rf", path.join(__dirname, ".bin"));
	shell.rm("-rf", GENERATED_PROTO_DIR);

	cb();
};

const run = cb => {
	shell.exec(
		path.join(
			__dirname,
			"cmd",
			"mather.js-server",
			"mather.js-server start"
		)
	);

	cb();
};

const watch = cb => {
	const watchDirs = [
		path.join(__dirname, "cmd", "**"),
		path.join(__dirname, "src", "lib"),
		path.join(__dirname, "src", "proto"),
		path.join(__dirname, "src", "svc")
	];

	return nodemon({
		script: path.join(
			__dirname,
			"cmd",
			"mather.js-server",
			"mather.js-server"
		),
		ext: "js-server js proto",
		args: ["start"],
		tasks: ["protocBuild"],
		ignore: "*_pb.js",
		watch: watchDirs,
		done: cb
	});
};

exports.default = protocBuild;
exports.protocBuild = protocBuild;
exports.pkgBuildBinary = pkgBuildBinary;
exports.pkgInstallBinary = pkgInstallBinary;
exports.clean = clean;
exports.run = run;
exports.watch = gulp.series(protocBuild, watch);
