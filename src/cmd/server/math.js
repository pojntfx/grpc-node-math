const {
  Server,
  ServerCredentials: {createInsecure},
} = require('grpc');
const {MathService} = require('../../../.generated/src/lib/proto/math_grpc_pb');
const mathServiceImplementation = require('../../lib/svc/math');
const commander = require('commander');

// The port to run the gRPC server on
commander.option(
  '-p, --port',
  'The port to run the gRPC server on (by default :30000)',
);
commander.parse(process.argv);
const PORT = commander.port || ':30000';

// Register the services
const server = new Server();
server.addService(MathService, mathServiceImplementation);
server.bind(`0.0.0.0${PORT}`, createInsecure());

// Start the server
console.log(`server started on port ${PORT}`);
server.start();
