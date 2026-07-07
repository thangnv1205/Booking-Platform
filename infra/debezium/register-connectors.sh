#!/bin/bash
set -e

CONNECT_URL="http://localhost:8083"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Waiting for Kafka Connect at $CONNECT_URL ..."
until curl -s -o /dev/null -w "%{http_code}" "$CONNECT_URL/connectors" | grep -q "200"; do
  sleep 2
done

for cfg in "$DIR"/booking-outbox-connector.json "$DIR"/payment-outbox-connector.json; do
  name=$(node -e "console.log(require('$cfg').name)")
  echo "Registering connector $name"
  curl -s -X PUT "$CONNECT_URL/connectors/$name/config" \
    -H "Content-Type: application/json" \
    -d "$(node -e "console.log(JSON.stringify(require('$cfg').config))")" \
    | node -e "process.stdin.on('data', d => console.log(d.toString()))"
  echo
done
