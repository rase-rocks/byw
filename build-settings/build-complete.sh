#! /bin/zsh

# Colors
RED='\033[0;31m'
NC='\033[0m'
GREEN='\033[1;32m'

clear

sh ./build-settings/build.sh

echo "\n[${GREEN}Running Tests...${NC}]\n"
npm test

echo "\n[${GREEN}Creating SEO pages${NC}]\n"
gulp seo-hack-build-pages
NODE_ENV='production' node ./build-settings/build-pages-node.js > ./seo-hacks/seo-pages.json
node ./seo-hacks/split-pages.js

echo "\n[${GREEN}Copying seo pages to build folder${NC}]\n"
cp ./seo-hacks/pages/* ./s3-build/

echo "\n[${GREEN}Run uncss (the source of many npm audit errors)${NC}]\n"
gulp static-optimize-css
gulp static-add-missing-classes

echo "\n[${GREEN}Creating sitemap.xml${NC}]\n"
node ./seo-hacks/generate-sitemap.js > ./s3-build/sitemap.xml

