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

start:             # Start the frontend
	make start_frontend

start_frontend:    # Build the frontend
	npm run dev

# Export Documentation
export_pdf:        # Export pitch deck to PDF using Marp
	npx marp pitch_deck.md --pdf --allow-local-files --html

# Pre-commit Checks
before_commit: lint	format	format_check	build_frontend

# Help
help:              # Show this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  install         Install npm packages"
	@echo "  setup_husky     Setup Husky for git hooks"
	@echo "  clean           Clean the project"
	@echo "  lint            Run linter"
	@echo "  format          Format code"
	@echo "  format_check    Check code formatting"
	@echo "  build_frontend  Build the frontend"
	@echo "  start           Start the frontend"
	@echo "  export_pdf      Export pitch deck to PDF using Marp"
	@echo "  elavator_pitch  Export elevator pitch deck to PDF using Marp"
	@echo "  before_commit   Run checks before commit"
	@echo "  help            Show this help message"
