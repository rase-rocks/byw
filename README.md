# byw - Breathe your Welsh Project

#### View the live version

https://www.byw.cymru

#### Status

[![Build Status](https://travis-ci.org/rase-rocks/byw.svg?branch=master)](https://travis-ci.org/rase-rocks/byw)

### Summary

The Breathe your Welsh project is a community driven action to help increase the visibility of the Welsh language. The project is based around an original idea by Peter Allen on the SaySomethingIn.com Welsh forum.

### Project Structure

This repository is destined to hold the source for a client side React / Redux app with the server side implementation being on AWS as a Serverless S3 / Lambda combination. The index.html page is initially rendered during the build phase in development and then rendered client side.

The development source code should be placed into the client folder. NPM scripts should be used to package everything up ready for upload to S3. This automates the build process and ensures all the dependencies are present. These scripts can be run from the project root folder, with the scripts themselves being in the build-settings folder.

The s3-build folder should not be manually altered as it is cleared for every build and therefore any changes will not be persisted. This is an intentional design decision to enforce and check that the S3 upload has no missing dependencies.

```
Root
|
+---- wwww // Things normally found in the www root, copied into s3-build by build scripts
|
+---- client // Client source files that are built into the s3-build folder
|    |
|    +---- app // Client code that is browserified
|    |    |
|    |    + core // Project wide components and utils
|    |    |    |
|    |    |    +---- model // Model methods
|    |    |    |   
|    |    |    |
|    |    |    +---- redux // Redux specific code
|    |    |         |
|    |    |         +---- actions
|    |    |         +---- middleware
|    |    |         +---- reducers
|    |    |
|    |    +---- pages // Page components
|    |
|    +---- assets // Static assets that are to be copied to S3
|    |
|    +---- css // Individual css files that are concatenated and striped of unused classes
|              // then inlined
|
+---- s3-build // Files for sync to static S3 hosting. Do not update this folder manually
|
+---- static-api // dev static file to mock api
|     |
|     +---- public
|           |
|           +---- data // mock data source of original website data
|
+---- build-settings // Build scripts
|
+---- existing-data // dev means to use data from existing website datasource
|
```

### Contributing

Community contributions are welcome. In order to contribute check out the project structure above.

#### Contributing most appreciated on:

Currently we are actively seeking contributions from the community for the following areas:

+ SVG Graphics for things such as icons and some page elements
+ Informational content

#### Contributing workflow

A suggestion on how to go about proposing a change to this project:

1. [Fork this project][fork] to your account.
2. [Create a branch][branch] for the change you intend to make.
3. Make your changes to your fork.
4. [Send a pull request][pr] from your fork’s branch to the `master` branch.

#### Prerequisites

A familiarity with following concepts would be useful:

+ Javascript
+ Git
+ Nodejs
+ npm
+ React / Redux

Clone the project to your local file system and run:

```
npm install
```

To get a build folder run. Once this has been created it can be served up during development:

```
npm run build
```

To run a full build ready for deployment:
```
npm run deploy
```
The section of the script that syncs with AWS S3 is commented out so that full builds can be made during development. This is useful as a full build includes unused css class removal.

The package has the http-serve as a dependency to allow for local development. This will serve the files out of the s3-build folder. To use run:

```
npm run serve-build
```

### Build Process

The build script first of all runs browserify over the client app so that it can be rendered by a local node instance. This is to enable a rendered html page to be uploaded to S3. 

The build script also browserifies the client app and bundles it as well as copying over all the static assets.

There is an eslintrc file included to enforce style guidlines.

### Vocabulary Page

A current work in progress is the Vocab page. When complete it is will be a searchable vocabulary list of commonly used terms. The page is currently simply a list of all the vocab I have translated so far. The search functionality is relatively trivial and will be implemented when the translating is done.

#### Adding to the vocab list

To make the translation process easier, the working file for the vocab is 'geirfa.csv'. It is a csv file so it can be easily edited either in a text editor (the recommended way, but use something like Visual Studio Code / Atom / Vim / gEdit etc, Word or similar wont work), or even a spreadsheet if it gets too large to manipulate, by hand, in a text editor.

There is an npm script to take the csv file, convert it to json and copy it over to the correct folder in the client app folder structure. When the client app is built the whole json object is imported, hence the search facility will be easy to implement. If later this approach proves too naive (probably due to file size), then another option can be looked at. Probably a script to upload the json to DynamoDB and an api call to download parts of the data as needed. It could then perhaps be serialized and cached away in web LocalStorage to cut down on download bandwidth / time.

After making changes to geirfa.csv run

```
npm run make-geirfa
```

If there is a problem with the csv file the script will complain. Remember its comma separated, so no commas in notes and if there are no notes a trailing comma is still required. Again, VS Code is recommended with a syntax highlighting extension as it makes this really easy to spot.


### Dependencies

External services that the app fetches out to

Geocoding: https://github.com/ideal-postcodes/postcodes.io/ <br/>
Map tiling: https://github.com/Leaflet/Leaflet


[fork]:
[branch]:
[pr]: https://github.com/rase-rocks/byw/compare?expand=1