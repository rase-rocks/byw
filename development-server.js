const HTTPServer = require("http-serve");

const options = {
    root: "./s3-build",
    headers: {
        "Content-Security-Policy": "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' *.tile.openstreetmap.org data:; font-src 'self'; connect-src 'self' https://q64w5l7tw9.execute-api.eu-west-1.amazonaws.com https://api.postcodes.io; form-action 'self'; upgrade-insecure-requests; base-uri 'self'; manifest-src 'self'; frame-ancestors 'none'",
        "Feature-Policy": "geolocation 'none'; camera 'none'; microphone 'none'; payment 'none'"
    },
    logFn: function (req, res, error) {
        var date = new Date().toTimeString().substring(0, 8);
        if (error) {
            console.info(
                "[%s] \"%s %s\" Error (%s): \"%s\"",
                date, req.method, req.url,
                error.status.toString(), error.message
            );
        }
        else {
            console.info(
                "[%s] \"%s %s\"",
                date, req.method, req.url
            );
        }
    }
};

const server = HTTPServer.createServer(options);
server.listen(8080, "127.0.0.1", function () {
    console.log("Server Started");
});