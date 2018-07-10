# ToDo

### Front end

+ ~~Wrangle existing data to get postcode into separate property~~ ✓
+ Set submit map pin to location of selected location if there is one
+ Remove unused CSS classes
+ Minify js in build process
+ About page heat map / or other as decided

#### Logic

+ ~~Implement search from the home page~~ ✓
+ ~~Think about the most useful method of searching from the home search bar~~ ✓
+ Implement rating system so that the category can update as more users chime in
+ ~~Consider having map page locate map onto search result bounding box when viewed~~ ✓
+ About page heat map data wrangling

#### Styling / content

+ ~~Draw SVGs for each icon~~ ✓
+ ~~Change the about page into a 'for business owners page'~~
+ Add a heatmap to the about page and use this page to describe the project
+ Footer content
+ Implement 404 and replace current route which just sends to the home route
+ Consider swapping the gh-pages staging environment for a 'website about the website'

### Back end

+ Make a back end!
+ Implement checking when submitting a new location to the index, and if the location is already in the index
just add to it
+ Implement staging environment
+ Implement a reverse geocoding system (*what?* Yes, this will likely have to be a separate project), to 
    give us an open source system to allow the map on the submit page to be searched via place name. Current
    thoughts are to put an api gateway in front of a rate limiting and caching system that calls out to Nominatim.
    Check the usage terms at https://operations.osmfoundation.org/policies/nominatim/