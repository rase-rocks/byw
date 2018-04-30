# byw - Breath your Welsh Project

### Summary

The Breath your Welsh project is a community driven action to help increase the visibility of the Welsh language. The project is based around an original idea by Peter Allen on the SaySomethingIn.com Welsh forum.

### Project Structure

This repository is destined to hold the source for a client side React / Redux app with the server side implementation being on AWS as a Serverless S3 / Lambda combination. The index.html page is initially rendered during the build phase in development and then rendered client side.

The development source code should be placed into the client folder. NPM scripts should be used to package everything up ready for upload to S3. This automates the build process and ensures all the dependencies are present. These scripts can be run from the project root folder, with the scripts themselves being in the build-settings folder.

The s3-build folder should not be manually altered as it is cleared for every build and therefore any changes will not be persisted. This is an intentional design decision to enforce and check that the S3 upload has no missing dependencies.

<pre>
Root
|
+---- client // Client source files that are built into the s3-build folder
|    |
|    +---- app // Client code that is browserified
|    |
|    +---- assets // Static assets that are to be copied to S3
|    |
|    +---- css // Individual css files that are concatenated and striped of unused classes
|              // then inlined
|
+---- s3-build // Files for sync to static S3 hosting. Do not update this folder manually
|
+---- build-settings // Build scripts
|
+---- 
</pre>

### Contributing

Community contributions are welcome. In order to contribute check out the project structure above.

Clone the project to your local file system and run:

<pre>npm install</pre>

The package has the <pre>http-serve</pre> as a dependency to allow for local development. This will serve the files out of the s3-build folder.

To get a build folder run:

<pre>npm run build</pre>

There is an eslintrc file included to enforce style guidlines.


