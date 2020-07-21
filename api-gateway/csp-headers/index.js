'use strict';
exports.handler = (event, context, callback) => {

    //Get contents of response
    const response = event.Records[0].cf.response;

    if (response) {
        const headers = response.headers;

        //Set new headers 
        headers['strict-transport-security'] = [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubdomains; preload' }];
        headers['content-security-policy'] = [{ key: 'Content-Security-Policy', value: "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' *.tile.openstreetmap.org data:; font-src 'self'; connect-src 'self' https://q64w5l7tw9.execute-api.eu-west-1.amazonaws.com https://api.postcodes.io; form-action 'self'; upgrade-insecure-requests; base-uri 'self'; manifest-src 'self'; frame-ancestors 'none'" }];
        headers['x-content-type-options'] = [{ key: 'X-Content-Type-Options', value: 'nosniff' }];
        headers['x-frame-options'] = [{ key: 'X-Frame-Options', value: 'DENY' }];
        headers['x-xss-protection'] = [{ key: 'X-XSS-Protection', value: '1; mode=block' }];
        headers['referrer-policy'] = [{ key: 'Referrer-Policy', value: 'same-origin' }];
        headers['feature-policy'] = [{ key: 'Feature-Policy', value: "geolocation 'none'; camera 'none'; microphone 'none'; payment 'none'"}];
    }

    //Return modified response
    callback(null, response);
};