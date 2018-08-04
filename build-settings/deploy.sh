#! /bin/bash

# Colors
RED='\033[0;31m'
NC='\033[0m'
GREEN='\033[1;32m'

clear

read -p "Have you enabled uglify in gulpfile?" isUglifyEnabled
if [ $isUglifyEnabled != "y" ]; then
  echo "\n${RED}====================================================${NC}\n"
  echo "    Go and enable uglify for production builds"
  echo "\n${RED}====================================================${NC}\n"
  exit 0;
fi

echo "\n[1/5]-[${RED}Removing Build folder${NC}]\n"
rm -r ./s3-build

echo "\n[2/5]-[${GREEN}Rendering index.html${NC}]\n"
NODE_ENV='production' gulp static-build
NODE_ENV='production' node ./s3-build/static-index-build.js > ./s3-build/index.html

echo "\n[3/5]-[${GREEN}Building client app${NC}]\n"
NODE_ENV='production' gulp static

echo "\n[4/5]-[${GREEN}Cleaning up${NC}]\n"
rm ./s3-build/static-index-build.js

echo "\n[5/5] - [${RED}Deploying to S3${NC}]\n"
~/Library/Python/2.7/bin/aws s3 sync ./s3-build/ s3://byw --delete --exclude '.DS_Store' --cache-control max-age=604800