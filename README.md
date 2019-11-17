# Mather Service (in Node)

Simple Node gRPC microservice that does math.

[![Build Status](https://travis-ci.com/pojntfx/mather.js.svg?branch=master)](https://travis-ci.com/pojntfx/mather.js)

## Features

- Add numbers
- Subtract numbers

## Usage

### From Prebuilt Binaries

Prebuilt binaries are available on the [releases page](https://github.com/pojntfx/mather.js/releases/latest).

### From npm

```bash
# Install
npm install mather.js # Please use `nvm` to prevent permission errors

# Run
mather.js-server start
```

### From Source

#### Prerequisites

```bash
# Install dependencies
npm install

# Clean (optional)
npm run clean

# Build
npm run build
```

#### Start With Toolchain

```bash
# Run
npm start
```

#### Start As Standalone Binary

```bash
# Build binary (with `pkg`)
npm run pkg-binary-build-linux-amd64
# or
npm run pkg-binary-build-darwin-amd64

# Install binary (from `pkg`)
sudo -E env "PATH=$PATH" npm run pkg-binary-install-linux-amd64
# or
sudo -E env "PATH=$PATH" npm run pkg-binary-install-darwin-amd64

# Run
mather.js-server start
```

#### Unit Tests

```bash
# Start unit tests
npm test
```

#### Integration Tests

```bash
# Start integration tests
npm run integration-tests
```

#### Integration Tests (For Standalone Binary)

```bash
# Start integration tests (for standalone binary)
sudo -E env "PATH=$PATH" npm run pkg-binary-integration-tests-linux-amd64
# or
sudo -E env "PATH=$PATH" npm run pkg-binary-integration-tests-darwin-amd64
```

#### Development

```bash
# Start unit tests, start server and restart both if source changed
npm run dev
```

## License

Mather Service (in Node) (c) 2019 Felicitas Pojtinger

SPDX-License-Identifier: AGPL-3.0
