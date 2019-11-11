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

```
# Install
npm install -g mather.js # Please use `nvm` to prevent any permission issues

# Run
mather.js-server start
```

### From Source (Interpreter)

```bash
# Install dependencies
npm install

# Clean (optional)
npm run clean

# Build
npm run build

# Run
npm start
```

### From Source (Binary)

```bash
# Install dependencies
npm install

# Clean (optional)
npm run clean

# Build
npm run build

# Build binary (with `pkg`)
npm run pkg-build-binary-linux-amd64
# or
npm run pkg-build-binary-darwin-amd64

# Install binary (from `pkg`)
npm run pkg-install-binary-linux-amd64
# or
npm run pkg-install-binary-darwin-amd64

# Run
mather.js-server start
```

### From Source (Development)

```
# Install dependencies
npm install

# Watch, run and reload
npm run dev
```

## License

Mather Service (in Node) (c) 2019 Felix Pojtinger

SPDX-License-Identifier: AGPL-3.0
