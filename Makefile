.PHONY: install setup_husky clean lint format format_check before_commit build_frontend start export_pdf help

# Installation and Setup
install:           # Install npm packages
	npm install

setup_husky:      # Setup Husky for git hooks
	npm run husky

# Code Quality and Formatting
clean:             # Clean the project
	npm run clean

lint:              # Run linter
	npm run lint

format:            # Format code
	npm run format

format_check:      # Check code formatting
	npm run format:check

# Build and Deployment
build_frontend:    # Build the frontend
	npm run build

build: build_frontend    # Build the frontend

# Testing
test:              # Run tests
	npm run test

test_watch:        # Run tests in watch mode
	npm run test:watch

# Docker Compose
docker_build:      # Build Docker Compose
	docker compose build

docker_up:         # Start Docker Compose
	docker compose up

docker_down:       # Stop Docker Compose
	docker compose down

docker_exec:       # Enter the container
	docker compose exec app bash

# Start the frontend
start: start_frontend    # Start the frontend

start_frontend:    # Start the frontend development server
	npm run dev

# Export Documentation
export_pdf:        # Export pitch deck to PDF using Marp
	npx marp pitch_deck.md --pdf --allow-local-files --html

# Pre-commit Checks
before_commit: lint format format_check build_frontend

# Help
help:              # Show this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@awk -F ':|#' '/^[a-zA-Z0-9_-]+:.*?#/ {printf "  %-15s %s\n", $$1, $$NF}' $(MAKEFILE_LIST) | sort
