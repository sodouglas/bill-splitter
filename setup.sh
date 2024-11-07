#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# If the container is already running, exit and ask the user to stop it first.
if [ "$(docker ps -q -f name=prisma)" ]; then
  echo "The Prisma container is already running. Please stop it before running setup.sh."
  exit 1
fi

echo "Starting Docker containers..."
docker-compose up -d

echo "Waiting for PostgreSQL to be ready..."
# Use the wait-for-it.sh script to ensure PostgreSQL is ready before moving on.
./wait-for-it.sh postgres:5432 --timeout=15 -- echo "PostgreSQL is up and running!"

echo "Applying Prisma migrations..."
# Run migrations to set up the database schema
npx prisma migrate dev --name init

echo "Generating Prisma client..."
# Generate the Prisma client
npx prisma generate

echo "Setup completed! Docker containers are up, and Prisma is ready."
