#! /bin/zsh

# Colors
RED='\033[0;31m'
NC='\033[0m'
GREEN='\033[1;32m'

sh ./build-settings/build-complete.sh

echo "\n[${GREEN}Syncing to S3${NC}]\n"
aws s3 sync ./s3-build/ s3://byw.cymru --delete --exclude '.DS_Store' --cache-control max-age=31536000

echo "\n[${GREEN}Updating page content type on S3${NC}]\n"

files=("map" "vocabulary" "about" "submit" "privacy")
for i in "${files[@]}"
do
	aws s3 cp --content-type "text/html" --metadata-directive REPLACE s3://byw.cymru/$i s3://byw.cymru/$i
done