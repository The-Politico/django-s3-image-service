test:
	pytest -v

ship:
	python setup.py sdist bdist_wheel
	twine upload dist/* --skip-existing

dev:
	gulp --cwd s3imageservice/staticapp/

database:
	sudo -u postgres dropdb s3imageservice --if-exists
	sudo -u postgres createdb s3imageservice
