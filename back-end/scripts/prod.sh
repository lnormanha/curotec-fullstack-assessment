#!/bin/sh

ENV_FILE=$(realpath .env.prod)

echo "Building release version:"
npm run build

echo "Clearing existing production containers"
docker-compose --env-file $ENV_FILE -f ./docker/docker-compose.prod.yml down -v

echo "Starting production containers"
docker-compose --env-file $ENV_FILE -f ./docker/docker-compose.prod.yml up --build -d
