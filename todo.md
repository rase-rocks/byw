# ToDo

### Front end

+ Remove unused CSS classes
+ Clustering for map pins
+ Photo upload with submission
+ Locate the submission map based on a search - See back end tasks
+ Map page result sorting - if search text is entered, sort by distance

#### Base language

+ ~~Implement a simple to use CSV based UI language content raw data system~~ ✓
+ ~~Implement within build system a means to take the raw CSV translations and convert to json for inclusion in the app~~ ✓
+ ~~Implement Base Language switching component to choose from available UI languages~~ ✓
+ ~~Implement tests to ensure that raw CSV files conform to standard ready for JSON conversion~~ ✓
+ ~~Implement tests to ensure JSON conversion was successful and all page elements have translated version~~ ✓
+ ~~Implement tests to ensure no unused translations in either raw CSV for JSON~~ ✓

#### Heat map

+ About page heat map / or other as decided
+ Add a heat map to the about page and use this page to describe the project

#### Completed

+ ~~Wrangle existing data to get postcode into separate property~~ ✓
+ ~~Set submit map pin to location of selected location if there is one and clear form~~ ✓
+ ~~Minify JavaScript in build process~~
+ ~~Add all locations to map, but with different icon to distinguish~~
+ ~~Add currently indexed locations to submit map with discrete icon~~
+ ~~Add a submission to the local state~~ ✓

### Vocabulary

+ Complete vocabulary translation and listing
+ ~~Pre compute hash for translation units to reduce unique key generation on each render~~

#### Logic

+ ~~Implement search from the home page~~ ✓
+ ~~Think about the most useful method of searching from the home search bar~~ ✓
+ ~~Consider having map page locate map onto search result bounding box when viewed~~ ✓
+ About page heat map data wrangling

#### Styling / content

+ ~~Draw SVGs for each icon~~ ✓
+ ~~Change the about page into a 'for business owners page'~~
+ Footer content
+ Implement 404 and replace current route which just sends to the home route
+ Consider swapping the gh-pages staging environment for a 'website about the website'

### Back end

+ ~~Make a back end!~~ ✓
+ ~~Implement checking when submitting a new location to the index, and if the location is already in the index
just add to it~~ ✓
+ ~~Implement rating system so that the category can update as more users chime in~~ ✓
+ Photo uploads, filtering and storage
+ ~~Monthly data snapshots (also a useful as a backup)~~ New workflow renders this unnecessary
+ Implement staging environment
+ Implement exporting both tables to S3 for backup
+ Implement a reverse geocoding system (*what?* Yes, this will likely have to be a separate project), to 
    give us an open source system to allow the map on the submit page to be searched via place name. Current
    thoughts are to put an api gateway in front of a rate limiting and caching system that calls out to Nominatim.
    Check the usage terms at https://operations.osmfoundation.org/policies/nominatim/