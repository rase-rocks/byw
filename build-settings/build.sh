#! /bin/zsh

# Colors
RED='\033[0;31m'
NC='\033[0m'
GREEN='\033[1;32m'

clear

echo "\n[1/7]-[${RED}Removing Build folder${NC}]\n"
rm -r ./s3-build

echo "\n[1/7]-[${GREEN}Making Geirfa JSON${NC}]\n"
sh ./build-settings/make-geirfa.sh

echo "\n[2/7]-[${GREEN}Rendering index.html${NC}]\n"
gulp static-build
node ./s3-build/static-index-build.js > ./s3-build/index.html

echo "\n[3/7]-[${GREEN}Building client app${NC}]\n"
gulp static

echo "\n[4/7]-[${GREEN}Cleaning up${NC}]\n"
rm ./s3-build/static-index-build.js

echo "\n[5/7]-[${GREEN}Copying www root files${NC}]\n"
cp ./www/* ./s3-build

echo "\n[6/7]-[${GREEN}Copying build to /docs for GitHub pages${NC}]\n"
echo "[${RED}Skipped...${NC}]"

echo "\n[7/7]-[Build complete at ${GREEN}s3-build/${NC}]\n"
