#! /bin/bash

# Colors
RED='\033[0;31m'
NC='\033[0m'
GREEN='\033[1;32m'

clear

echo "\n[1/6]-[${RED}Removing Build folder${NC}]\n"
rm -r ./s3-build

echo "\n[2/6]-[${GREEN}Rendering index.html${NC}]\n"
NODE_ENV='production' gulp static-build
NODE_ENV='production' node ./s3-build/static-index-build.js > ./s3-build/index.html

echo "\n[3/6]-[${GREEN}Building client app${NC}]\n"
NODE_ENV='production' gulp static

echo "\n[4/6]-[${GREEN}Cleaning up${NC}]\n"
rm ./s3-build/static-index-build.js

echo "\n[5/6]-[${GREEN}Copying build to /docs for GitHub pages${NC}]\n"
echo "[${RED}Skipped...${NC}]"
# rm -r ./docs
# mkdir ./docs
# cp -r ./s3-build/* ./docs
# sed -i '' "s/assets/byw\/assets/g; s/static-api/byw\/static-api/g;" ./docs/bundle.js

echo "\n[6/6]-[Build complete at ${GREEN}s3-build/${NC}]\n"