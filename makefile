

ensure-dependencies:
	@echo "Ensuring docker is installed..."
	@docker info

brand:
	@echo "Creating our my-service manifest file..."
	@node_modules/make-manifest/bin/make-manifest
	@cat ./manifest.json

package:
	@echo "Building our my-service docker image..."
	@docker build --tag my-service .
	@docker images

qa:
	@echo "Checking that our my-service tests dont fail..."
	@npm run qa