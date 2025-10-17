# DB-Admin-WebApp
A microservice architecture based web application for administrating a database.

# Overview
This project is a Full-Stack Web Application using the MERN (MongoDB, Express, React, NodeJS) stack. Each part of the application (the DB, the microservices, the API-Gateway and the front-end) are containerized using Docker. 
Each section of the web app (Create Person, Modify Person data, Consult Person data, Delete Person, Consult Log) are divided into microservices (If for example, the container of the create Person service fails, all other services will keep on working).


# Usage
By default the project runs in the localhost, but this can be configured by the user. 
The steps to run the project are as follows:
- Clone the repo
```bash
git clone https://github.com/Khalil002/DB-Admin-WebApp.git
```
- Cd into the microservices folder
```bash
cd microservices
```
- Run docker
```bash
docker compose up
```
The website can be accessed through the browser in http://localhost:8080 (Each microservice can be curled to independantly as well).
