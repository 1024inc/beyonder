DOCKER_REPOSITORY=gcr.io/beyond-pricing-1024/beyonder
DOCKER_TAG=latest

build:
	docker build -f prod.Dockerfile -t ${DOCKER_REPOSITORY}:${DOCKER_TAG} ../.

rebuild:
	docker build -f prod.Dockerfile --no-cache -t ${DOCKER_REPOSITORY}:${DOCKER_TAG} ../.

push:
	docker push ${DOCKER_REPOSITORY}:${DOCKER_TAG}

