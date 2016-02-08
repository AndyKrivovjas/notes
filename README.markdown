# Instalation #
apt-get install python-dev libjpeg-dev zlib1g-dev  
apt-get install python-virtualenv virtualenvwrapper  
apt-get install nodejs  

sudo ln -s /usr/lib/x86_64-linux-gnu/libjpeg.so /usr/lib  

virtualenv env  
source env/bin/activate  

pip install -r requirements.txt  
make setup 

npm install -g grunt-cli bower  
npm install  
bower install  
grunt dev

./manage.py runserver