#!/bin/sh

yarn build
mv dist price
tar zcvf price.tgz price
scp price.tgz pi:~
ssh pi "cd /var/www/html && sudo mv ~/price.tgz . && sudo tar zxvf price.tgz && sudo rm price.tgz"
rm price.tgz
rm -rf price