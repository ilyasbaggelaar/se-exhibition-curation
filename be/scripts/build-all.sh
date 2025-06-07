#!/bin/bash

echo "🔧 Building backend..."
cd be
npm install
tsc

echo "✅ Backend built."
