#! /bin/zsh

gulp seo-hack-build-pages

NODE_ENV='production' node ./seo-hacks/build-pages-node.js > ./seo-hacks/seo-pages.json
rm ./seo-hacks/pages/*
node ./seo-hacks/split-pages.js

node ./seo-hacks/generate-sitemap.js > ./client/www/sitemap.xml
cp ./client/www/sitemap.xml ./build