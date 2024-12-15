#!/bin/sh

echo "NODE_ENV is set to: $NODE_ENV"

if [ "$NODE_ENV" = "production" ]; then
  echo "Starting application in production mode..."
  npm run prisma:migrate:prod &&  npm run prisma:seed && npm run backend:prod 
else
  echo "Starting application in development mode..."
  npm run backend:dev
fi