install:
	pip install -r requirements.txt

test:
	pytest tests/

lint:
	flake8 src/
	black --check src/

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

migrate:
	alembic upgrade head
