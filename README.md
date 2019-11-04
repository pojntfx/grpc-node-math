# Felicitas Pojtinger's Math gRPC Node Microservice

A simple math GRPC microservice, for the purpose of learning and evaluating Node and gRPC.

[![Build Status](https://travis-ci.com/pojntfx/math-grpc-node.svg?branch=master)](https://travis-ci.com/pojntfx/math-grpc-node)

## Features

- Add numbers
- Subtract numbers

## Usage

### Pre-Built Binaries

Binaries are made available on the [releases page](https://github.com/pojntfx/math-grpc-node/releases/latest). Place the `grpc_node.node-${PLATFORM}-${ARCHITECTURE}`-file in the same directory as the binary itself. It contains the gRPC C library, which can't be packaged into the binary. Note: There is currently no way to use this microservice on `arm64`; see [#14741](https://github.com/grpc/grpc/issues/14741).

### Build Binaries From Source

```bash
# Build protos
npm run build-protoc

# Build
npm run build-pkg-linux-amd64
# or
# npm run build-pkg-linux-arm64
# or
npm run build-pkg-darwin-amd64

# Install
sudo install ./.bin/math-grpc-node-server-linux-amd64 /usr/local/bin
sudo install ./.bin/grpc_node.node-linux-amd64 /usr/local/bin
# or
# sudo install ./.bin/math-grpc-node-server-linux-arm64 /usr/local/bin
# sudo install ./.bin/grpc_node.node-linux-arm64 /usr/local/bin
# or
sudo install ./.bin/math-grpc-node-server-darwin-amd64 /usr/local/bin
sudo install ./.bin/grpc_node.node-darwin-amd64 /usr/local/bin

# Run
math-grpc-node-server-linux-amd64
# or
# math-grpc-node-server-linux-arm64
# or
math-grpc-node-server-darwin-amd64
```

### Run From Source Without Building Binaries

```bash
# Build protos
npm run build-protoc

# Run
npm start
```

## License

gRPC Node Math Microservice (c) 2019 Felicitas Pojtinger

SPDX-License-Identifier: AGPL-3.0
