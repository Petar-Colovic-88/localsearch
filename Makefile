.DEFAULT_GOAL := help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

docker: ## Run apps with docker
	docker-compose up

docker-dev: ## Run dev apps with docker
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

api-dev: ## Run API app
	@cd api/ && npm run start:debug

api-test: ## Run API app
	@cd api/ && npm run test

ui-dev: ## Run UI app
	@cd ui/ && npm run dev
