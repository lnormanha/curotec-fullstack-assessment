#!/bin/sh

ENV_FILE=$(realpath .env.dev)

echo "Clearing existing development containers"
docker-compose --env-file $ENV_FILE -f ./docker/docker-compose.dev.yml down -v

echo "Starting development containers"
docker-compose --env-file $ENV_FILE -f ./docker/docker-compose.dev.yml up --build

