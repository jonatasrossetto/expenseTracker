This is a simple expenses loging web app
It is intended to run on aws ecs
run commands during development:
   * frontend: ng serve --open
   * backend: npm run devIndex
   backend: npm run devStart
   backend: npm run devStartAuth

to initialize the mysql docker container:
https://betterprogramming.pub/how-to-use-mysql-with-node-js-and-docker-7dfc10860e7c
docker run -p 3306:3306 --name booktracker-mysql -e MYSQL_ROOT_PASSWORD=321 -e MYSQL_DATABASE=booktracker_db -d mysql:latest

Issues to work on:
* create a intialization function to syncronize the database on the server first run