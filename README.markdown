<h1>Instalation</h1>
apt-get install python-dev libjpeg-dev zlib1g-dev <br>
apt-get install python-virtualenv virtualenvwrapper <br>
apt-get install nodejs <br>
<br>
sudo ln -s /usr/lib/x86_64-linux-gnu/libjpeg.so /usr/lib <br>
<br>
virtualenv env <br>
source env/bin/activate <br>
<br>
pip install -r requirements.txt <br>
<!-- python setup.py develop <br> -->
make create_database <br>
make make_fixtures <br>
<br>
npm install -g grunt-cli bower <br>
npm install <br>
bower install <br>
grunt <br>
<br>
./manage.py runserver <br>