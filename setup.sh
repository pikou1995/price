#!/bin/sh

cp -a price.conf /etc/nginx/sites-enabled/
nginx -s reload

cp -a price.service /etc/systemd/system/
systemctl daemon-reload
