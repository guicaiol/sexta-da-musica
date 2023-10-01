#!/bin/bash

#docker run -d -p 5000:80 sextadamusica-backend

source .venv/bin/activate
authbind --deep python3 src/main.py
