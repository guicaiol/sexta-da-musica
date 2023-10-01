#!/bin/bash

# Linux dependencies
apt-get update && apt-get install -y $(grep -vE "^\s*#" requirements-linux.txt | tr "\n" " ")

# NPM dependencies
npm install
