clean:
	rm -f app.sqlite

migrations:
	./manage.py makemigrations
	./manage.py migrate

create_root_user:
	./manage.py createsuperuser --username=root --password=123 --email=root@example.com --noinput

make_fixtures:
	./manage.py create_colors
	./manage.py create_users
	./manage.py create_api_application

setup: migrations make_fixtures

reinstall: clean setup
