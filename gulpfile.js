const gulp = require("gulp");
const shell = require("shelljs");
const path = require("path");
const nodemon = require("gulp-nodemon");
const jest = require("jest");
const log = require("pino")();

const GENERATED_PROTO_DIR = path.join(__dirname, "src", "proto", "generated");
const INSTALL_LOCATION = path.join("/usr", "local", "bin", "mather.js-server");

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

const pkgBinaryBuild = cb => {
	const target = process.env.PLATFORM === "darwin" ? "macos" : "linux";
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
			`mather.js-server-${process.env.PLATFORM}-${process.env.ARCHITECTURE}`
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
			`grpc_node.node-${process.env.PLATFORM}-${process.env.ARCHITECTURE}`
		)
	);

	cb();
};

const pkgBinaryInstall = cb => {
	shell.cp(
		path.join(
			__dirname,
			".bin",
			`grpc_node.node-${process.env.PLATFORM}-${process.env.ARCHITECTURE}`
		),
		path.join("/usr", "local", "bin", "grpc_node.node")
	);
	shell.cp(
		path.join(
			__dirname,
			".bin",
			`mather.js-server-${process.env.PLATFORM}-${process.env.ARCHITECTURE}`
		),
		INSTALL_LOCATION
	);

	cb();
};

const clean = cb => {
	shell.rm("-rf", path.join(__dirname, ".bin"));
	shell.rm("-rf", GENERATED_PROTO_DIR);

	cb();
};

const start = cb => {
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

const unitTests = async cb => {
	const options = {
		projects: [__dirname]
	};

	await jest.runCLI(options, options.projects);

	cb();
};

const integrationTests = cb => {
	shell.exec("npm pack");

	shell.exec("npm install -g *.tgz");

	shell.exec("mather.js-server --version");

	shell.rm(shell.which("mather.js-server"));

	log.info("Passed");

	cb();
};

const pkgBinaryIntegrationTests = cb => {
	pkgBinaryInstall(() => {});

	shell.exec("mather.js-server --version");

	shell.rm(INSTALL_LOCATION);

	log.info("Passed");

	cb();
};

const dev = cb => {
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
exports.build = protocBuild;
exports.pkgBinaryBuild = pkgBinaryBuild;
exports.pkgBinaryInstall = pkgBinaryInstall;
exports.clean = clean;
exports.start = start;
exports.unitTests = unitTests;
exports.integrationTests = integrationTests;
exports.pkgBinaryIntegrationTests = pkgBinaryIntegrationTests;
exports.dev = gulp.series(protocBuild, dev);
