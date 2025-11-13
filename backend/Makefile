.PHONY: up down build logs restart clean rebuild shell db-shell pnpm

up:
	docker-compose up -d
	@echo "Services are up! API available at http://localhost:4000"

down:
	docker-compose down

build:
	docker-compose build

rebuild:
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d
	@echo "Services rebuilt and started! API available at http://localhost:4000"

logs:
	docker-compose logs -f

restart:
	docker-compose restart

clean:
	docker-compose down -v
	@echo "Stopped and removed all containers, networks, and volumes"

shell:
	docker-compose exec api sh

db-shell:
	docker-compose exec postgres psql -U postgres -d fhl_dev

pnpm:
	docker-compose exec api pnpm $(filter-out $@,$(MAKECMDGOALS))

%:
	@:
