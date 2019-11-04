# Felix Pojtinger's Math gRPC Node Microservice

A simple math GRPC microservice, for the purpose of learning and evaluating Node and gRPC.

[![Build Status](https://travis-ci.com/pojntfx/math-grpc-node.svg?branch=master)](https://travis-ci.com/pojntfx/math-grpc-node)

## Features

- Add numbers
- Delete numbers

## Usage

Binaries are made available on the [releases page](https://github.com/pojntfx/math-grpc-node/releases/latest). Place the `grpc_node.node-${PLATFORM}-${ARCHITECTURE}`-file in the same directory as the binary itself. It contains the gRPC C library, which can't be packaged into the binary. Note: Only the Linux `amd64` binary works at the moment; in order for the Linux `arm64` and Darwin `amd64` binaries to work as well, an `arm64` Linux and `amd64` Darwin build would need to be set up. Alternatively, run the commands below to install from source:

```bash
# Build protos
npm run build-protoc

# Build
npm run build-pkg-linux-amd64
# or
npm run build-pkg-linux-arm64
# or
npm run build-pkg-darwin-amd64

# Install
sudo install ./.bin/math-grpc-node-server-linux-amd64 /usr/local/bin
sudo install ./.bin/grpc_node.node-linux-amd64 /usr/local/bin
# or
sudo install ./.bin/math-grpc-node-server-linux-arm64 /usr/local/bin
sudo install ./.bin/grpc_node.node-linux-arm64 /usr/local/bin
# or
sudo install ./.bin/math-grpc-node-server-darwin-amd64 /usr/local/bin
sudo install ./.bin/grpc_node.node-darwin-amd64 /usr/local/bin

# Run
math-grpc-node-server-linux-amd64
# or
math-grpc-node-server-linux-arm64
# or
math-grpc-node-server-darwin-amd64
```

You may also run the commands below to run without binary compilation:

```bash
# Build protos
npm run build-protoc

# Run
npm start
```

## License

gRPC Node Math Microservice (c) 2019 Felix Pojtinger

SPDX-License-Identifier: AGPL-3.0
