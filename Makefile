

prod.pull:
	docker compose -f docker-compose-prod.yml --env-file react.prod.env pull

prod.up:
	docker compose -f docker-compose-prod.yml --env-file react.prod.env up -d --force-recreate

prod.build-up:
	docker compose -f docker-compose-prod.yml --env-file react.prod.env up -d --force-recreate --build

prod.pull-build-up: prod.pull prod.build-up

prod.down:
	docker compose -f docker-compose-prod.yml --env-file react.prod.env down




local.pull:
	docker compose -f docker-compose-local.yml --env-file react.local.env pull

local.up:
	docker compose -f docker-compose-local.yml --env-file react.local.env up -d --force-recreate

local.build-up:
	docker compose -f docker-compose-local.yml --env-file react.local.env up -d --force-recreate --build

local.pull-build-up: local.pull local.build-up

local.down:
	docker compose -f docker-compose-local.yml --env-file react.local.env down
