#!/bin/sh
set -e

echo "Running Prisma migrations..."

# Ensure Prisma CLI is available in PATH (as configured in the Dockerfile)
if ! command -v prisma >/dev/null 2>&1; then
  echo "Error: 'prisma' CLI not found in PATH. Ensure the Dockerfile installs Prisma CLI and sets PATH correctly." >&2
  exit 1
fi

if ! prisma migrate deploy; then
  echo "Error: Failed to run 'prisma migrate deploy'. Exiting." >&2
  exit 1
fi
echo "Starting app..."

exec "$@"