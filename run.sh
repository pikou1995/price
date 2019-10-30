#!/bin/sh

npm stop
rm -f /etc/nginx/sites-enabled/*

git pull
npm install && npm run build && npm start
cp -a price.conf /etc/nginx/sites-enabled/

nginx -s reload
