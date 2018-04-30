#! /bin/bash

# Colors
RED='\033[0;31m'
NC='\033[0m'
GREEN='\033[1;32m'

clear

echo "\n[1/4]-[${RED}Removing Build folder${NC}]\n"
rm -r ./s3-build

echo "\n[2/4]-[${GREEN}Rendering index.html${NC}]\n"
gulp static-build
node ./s3-build/static-index-build.js > ./s3-build/index.html

echo "\n[3/4]-[${GREEN}Building client app${NC}]\n"
gulp static
gulp static-optimize-css

echo "\n[4/4]-[${GREEN}Cleaning up${NC}]\n"
rm ./s3-build/static-index-build.js

echo "\n[4/4]-[Build complete at ${GREEN}s3-build/${NC}]\n"