#!/bin/bash

echo "=== Test 1: Session (ingen auth) ==="
curl http://localhost:3000/api/auth/session
echo -e "\n\n"

echo "=== Test 2: Sign Up ==="
curl -X POST http://localhost:3000/api/auth/signup/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123456!",
    "name": "Test User"
  }'
echo -e "\n\n"

echo "=== Test 3: Sign In ==="
curl -X POST http://localhost:3000/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "test@example.com",
    "password": "Test123456!"
  }'
echo -e "\n\n"

echo "=== Test 4: Get Session (autentiserad) ==="
curl http://localhost:3000/api/auth/session \
  -b cookies.txt
echo -e "\n"
