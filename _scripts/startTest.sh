docker-compose -f docker-compose.yaml -f docker-compose.test.yaml up -d
docker exec -it habit-tracker bash -c "npm install && npm test"