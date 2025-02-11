#!/bin/sh

echo "Waiting for database to be ready..."
npx prisma generate

if [ ! -d "prisma/migrations" ] || [ -z "$(ls -A prisma/migrations)" ]; then
    echo "No migrations found. Creating initial migration..."
    npx prisma migrate dev --name init --create-only
fi

echo "Applying migrations..."
npx prisma migrate deploy
