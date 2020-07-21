# CSP Headers

This file is an example of an AWS Lambda function to add CSP (Content Security Policy) headers to all responses.

It should be triggers by an 'origin-response' event. That is when Cloudfront requests an object from S3 it should add the headers to the returned object.

*Note* it must be added to a Lambda function on us-east-1 region for it to get access to this trigger.