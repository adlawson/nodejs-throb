# Default task
all: install

# Install dependencies
install:
	@npm install

# Run test suites
tests: tests-unit

# Run unit tests
tests-unit:
	@./node_modules/.bin/mocha --ui tdd --reporter spec --colors --recursive ./tests
