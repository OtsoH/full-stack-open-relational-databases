# full-stack-open-relational-databases

## In these exercises the PostgreSQL database is run locally with docker

Main commands used:
- docker run --name full-stack-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5433:5432 postgres
- docker start -a full-stack-postgres
- docker exec -it full-stack-postgres psql -U postgres