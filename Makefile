.DEFAULT_GOAL := help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

docker: ## Run apps with docker
	docker-compose up --build

docker-dev: ## Run dev apps with docker [requires build of `make docker`]
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

docker-prod: ## Run prod apps with docker [requires build because of different docker image]
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build

api-install: ## Install API dependencies
	@cd api/ && npm install

api-dev: api-install ## Run API app
	@cd api/ && npm run start:debug

api-test: api-install ## Run API tests
	@cd api/ && npm run test

ui-install: ## Install UI dependencies
	@cd ui/ && npm install

ui-dev: ui-install ## Run UI app
	@cd ui/ && npm run dev
