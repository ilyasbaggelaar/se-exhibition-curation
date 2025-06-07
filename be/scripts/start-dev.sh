#!/bin/bash

echo "Running setup checks to validate if all files are setup..."
cd be
npx tsx scripts/setup-env.ts

echo "Starting FE development server..."
cd ../fe
npm run dev


