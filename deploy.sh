#!/bin/sh

WORKSPACE=$PWD
yarn build
cd ../pikou1995.github.io/price
rm -rf *
cp $WORKSPACE/dist/* .
rm -rf $WORKSPACE/dist
git add .
git commit -m 'update price'
git push