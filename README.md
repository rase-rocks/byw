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
+---- text
|     |
|     +---- languages
|     |     |
|     |     +---- english // Example folder for english text content. One folder per translation. Folder name is language identifier.
|     |           |
|     |           +---- translation.csv // Raw translation data as key/value pairs
|     |           +---- index.js // A transform function per language. If no special transformation is required, default can be used.
|     |
|     +---- build-scripts // Build phase scripts to produce text content datasource for app
|
+---- seo-hacks
|     |
|     +---- pages // Locally rendered pages to allow App routes to be visible to search engines
|
+---- test // Unit tests
```

### Contributing

Community contributions are welcome. In order to contribute check out the project structure above.

#### Contributing most appreciated on:

Currently we are actively seeking contributions from the community for the following areas:

+ User facing text language translations
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

There is an eslintrc file included to enforce style guidelines.

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

### UI Text Content Translations

The `text` folder contains all the data and scripts required to build the various translations for the user facing text content of the site.

Adding a translation for the entire website is very simple, just create a new folder for the translation, and name it how you would like the language to be represented to the user. An example is `english` for the English text content of the site. If your language needs to be named with multiple words open an issue so that hyphenated names can be supported. Currently there is none, but an example could be `english-uk` and `english-us`.

The add the translated text to a `translation.csv` file your language folder. For most cases that is all that is needed for the new translation to be picked up and included. If extra processing is required to transform the data from its CSV representation into its final JSON format include an `index.js` file in the folder. If this file is omitted the `default-transform` will be used. This should be sufficient for most cases. Take a look at `default-transform.js` implementation. Its layout is quite simple, it takes an identifier (such as 'english') and and folder path and returns a `Promise` that resolves to an object with the properties `identifier` and `text`. The `text` property should be an object containing all the required keys and values for the translation.

*Note* as with the `geirfa` it is recommended to use a plain text editor (or maybe a plain text editor with a CSV highlighting plugin) to create translations, which should all be UTF8 encoded. Again, any extra formatting characters that are added by a word processor will cause your CSV to fail to import. As the `,` is used to delimit fields, it cannot be used within text content paragraphs itself as doing so would signify the end of that field. To work around this, if the paragraph to be translated contains a `,` simply wrap the whole entry in `"` (html entity `&quot;`) not a `“` or others. 

For example:

```
phrase, "hello, world"
```

The `cymraeg` language folder includes an `index.js` which simply imports and then exports the default transformer. This is purely to provide an example implementation using a custom transformer in combination with the default-transformer, as a starting point.

A `translation-template.csv` file is included that can be copied and used as a starting point for translations as it will contain all the required keys to be translated. Again this file is created automatically so should not be edited as changes will be lost. It contains the key used by the app to find the relevant piece of text content and a hint to the translator in the form of the English version to be translated.

After adding a translation, be sure to run `npm test` as this will check that the translation is suitable for inclusion and report any errors found.

The new translation can be made available for use in the App code by running the package scripts individually or running a normal build.

```sh
npm run build
```
This will build the entire site and put the contents in the `s3-build` folder ready for serving or uploading.

You can also run the package scripts without having to do a full build by running:

```sh
npm run make-text-supported-languages
npm run make-text-supported-keys
npm run make-text-translations
npm run make-text-translation-template
```

Alternatively you can run all the scripts to build the entire text system in one command by running:

```sh
npm run make-text
```

### Using UI Text Content in React Components

The newly added language will then be available for code completion in text rendering app components. These scripts add JavaScript (js) files to the `./client/app/core/text/` folder. These files can then be imported as normal using `import` in JS. As these files are overwritten every build, they should not be edited manually, as these changes will be lost. Instead, if changes are required, alter the raw translations and re-run the build script.

For React components that require access to some of state, a smart / dumb pattern is preferred. That is the component should be split into two. The first (usually `index.js`) will be the 'smart' or controller component and will either handle its own state or use `connect` to access the app state. Any transformation of this state should be done in this component and then passed to the dumb (or view) component for rendering. The dumb component should have no knowledge outside of its `props` that it gets passed in.

Therefore in the case of components that render user facing text content, the controller component should have a `mapStateToProps` and look something like the below: (A very simple contrived example).

```js
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import text from "../text/data"; // Path to the auto generated script
import View from "./view";

class ViewController extends React.Component {

    render() {

        const { language } = this.props;
        const textContent = text[language];

        return (
            <View text={textContent} />
        );

    }

}

ViewController.propTypes = {
    language: PropTypes.string.isRequired
};

const mapStateToProps = function (state) {
    return {
        language: state.settings.language
    };
};

export default connect(mapStateToProps)(ViewController);
```

The view component should then `import` from `supportedKeys` to allow for code completion and build time checks. An example view component may look like:

```js
import React from "react";
import PropTypes from "prop-types";
import supportedKeys from "../text/supported-keys"; // path to the auto generated supported keys script

export function getText(text) {
    return {
        category0: text[supportedKeys.category0]
    }
}

class View extends React.Component {

    render() {

        const { text } = this.props;
        const { category0 } = getText(text);

        return (
            <span>
                {category0}
            </span>
        )
    }

}

View.propTypes = {
    text: PropTypes.object.isRequired
}

export default ViewComponent;
```

In this example the `View` component only has to 'know' about which keys it needs to render its content. A combination of unit tests and code completion ensures that all required keys are present in all translations and only those keys are used to access the `text` object.

#### Auto checking of rendered text

Any view component that exports a `getText` function will be automatically checked in unit tests that it has a valid value for every language. The `getText` function should take the passed in `text` and return an object that can be used in the `render` method to obtain the translated text for the required key.

### Dependencies

External services that the app fetches out to

Geocoding: https://github.com/ideal-postcodes/postcodes.io/ <br/>
Map tiling: https://github.com/Leaflet/Leaflet


[fork]:
[branch]:
[pr]: https://github.com/rase-rocks/byw/compare?expand=1