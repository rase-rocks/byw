#! /bin/zsh

# Colors
RED='\033[0;31m'
NC='\033[0m'
GREEN='\033[1;32m'

clear

echo "\n[${RED}Removing Build folder${NC}]\n"
rm -r ./s3-build

echo "\n[${GREEN}Making Geirfa${NC}]\n"
sh ./build-settings/make-geirfa.sh

echo "\n[${GREEN}Rendering index.html for server in production mode${NC}]\n"
NODE_ENV='production' gulp static-build
NODE_ENV='production' node ./s3-build/static-index-build.js > ./s3-build/index.html

echo "\n[${GREEN}Building client app with production mode${NC}]\n"
NODE_ENV='production' gulp static

echo "\n[${GREEN}Cleaning up${NC}]\n"
rm ./s3-build/static-index-build.js

echo "\n[${GREEN}Copying www root files${NC}]\n"
cp ./www/* ./s3-build
