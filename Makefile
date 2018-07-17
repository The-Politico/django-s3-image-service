test:
	pytest -v

ship:
	python setup.py sdist bdist_wheel
	twine upload dist/* --skip-existing

dev:
	gulp --cwd s3imageservice/staticapp/

database:
	dropdb s3imageservice --if-exists
	createdb s3imageservice
