#!/bin/bash

echo "Installing application dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "Error installing application dependencies."
    read -p "Press any key to continue..."
    exit 1
fi

echo "Building application..."
npm run make

if [ $? -ne 0 ]; then
    echo "Error building application."
    read -p "Press any key to continue..."
    exit 1
fi