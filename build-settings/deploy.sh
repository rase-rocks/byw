#! /bin/bash

# Colors
RED='\033[0;31m'
NC='\033[0m'
GREEN='\033[1;32m'

clear

# read -p "Have you enabled uglify in gulpfile?" isUglifyEnabled
# if [ $isUglifyEnabled != "y" ]; then
#   echo "\n${RED}====================================================${NC}\n"
#   echo "    Go and enable uglify for production builds"
#   echo "\n${RED}====================================================${NC}\n"
#   exit 0;
# fi

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

echo "\n[${GREEN}Running Tests...${NC}]\n"
npm test

echo "\n[${GREEN}Creating SEO pages${NC}]\n"
gulp seo-hack-build-pages
NODE_ENV='production' node ./build-settings/build-pages-node.js > ./seo-hacks/seo-pages.json
node ./seo-hacks/split-pages.js

echo "\n[${GREEN}Copying seo pages to build folder${NC}]\n"
cp ./seo-hacks/pages/* ./s3-build/

echo "\n[${GREEN}Creating sitemap.xml${NC}]\n"
node ./seo-hacks/generate-sitemap.js > ./s3-build/sitemap.xml

echo "\n[${RED}Edit URL before Deploying to S3${NC}]\n"
# ~/Library/Python/2.7/bin/aws s3 sync ./s3-build/ s3://byw.cymru --delete --exclude '.DS_Store' --cache-control max-age=31536000
# ~/Library/Python/2.7/bin/aws s3 cp --content-type "text/html" --metadata-directive REPLACE s3://byw.cymru/map s3://byw.cymru/map
# ~/Library/Python/2.7/bin/aws s3 cp --content-type "text/html" --metadata-directive REPLACE s3://byw.cymru/vocabulary s3://byw.cymru/vocabulary
# ~/Library/Python/2.7/bin/aws s3 cp --content-type "text/html" --metadata-directive REPLACE s3://byw.cymru/about s3://byw.cymru/about
# ~/Library/Python/2.7/bin/aws s3 cp --content-type "text/html" --metadata-directive REPLACE s3://byw.cymru/submit s3://byw.cymru/submit
# ~/Library/Python/2.7/bin/aws s3 cp --content-type "text/html" --metadata-directive REPLACE s3://byw.cymru/privacy s3://byw.cymru/privacy