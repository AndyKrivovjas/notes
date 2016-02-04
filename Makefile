clean:
	rm -f app.sqlite

create_database:
	./manage.py makemigrations --noinput
	./manage.py migrate --noinput
	./manage.py createsuperuser --username=root --email=root@example.com --noinput

make_fixtures:
	./manage.py create_users

all: clean create_database make_fixtures
