#! /bin/bash

# Colors
RED='\033[0;31m'
NC='\033[0m'
GREEN='\033[1;32m'

clear

echo "\n[1/5]-[${RED}Removing Build folder${NC}]\n"
rm -r ./s3-build

echo "\n[2/5]-[${GREEN}Rendering index.html${NC}]\n"
gulp static-build
node ./s3-build/static-index-build.js > ./s3-build/index.html

echo "\n[3/5]-[${GREEN}Building client app${NC}]\n"
gulp static

echo "\n[4/5]-[${GREEN}Cleaning up${NC}]\n"
rm ./s3-build/static-index-build.js

echo "\n[2/5]-[${GREEN}Copying build to /docs for GitHub pages${NC}]\n"
rm -r ./docs
mkdir ./docs
cp -r ./s3-build/* ./docs

echo "\n[5/5]-[Build complete at ${GREEN}s3-build/${NC}]\n"