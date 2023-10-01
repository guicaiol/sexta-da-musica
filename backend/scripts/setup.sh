#!/bin/bash

# Linux dependencies
apt-get update && apt-get install -y $(grep -vE "^\s*#" requirements-linux.txt | tr "\n" " ")

# Python dependencies
rm -rf .venv/
virtualenv .venv && source .venv/bin/activate && pip3 install -r requirements.txt
