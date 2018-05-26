/* global describe it */

const filterPolygon = require("../client/app/core/model/filter-locations/filter-polygon").default;

const snowdon = {
    latitude: 53.0685,
    longitude: -4.07625
};

const caernarfon = {
    latitude: 53.141305555555554,
    longitude: -4.276
};

const barBach = {
    latitude: 53.139664,
    longitude: -4.27438400000005
};

const machynlleth = {
    latitude: 52.590722222222226,
    longitude: -3.8493333333333335
};

const wem = [
    [-2.772204168140888, 52.86871281199227],
    [-2.675816304981709, 52.86871281199227],
    [-2.675816304981709, 52.84938295523601],
    [-2.772204168140888, 52.84938295523601]
];

const caernarfonBoundary = [
    [-4.375992491841317, 53.15928018128518],
    [-4.183216765522958, 53.15928018128518],
    [-4.183216765522958, 53.12087128541533],
    [-4.375992491841317, 53.12087128541533]
];

const coordinate = function (location) {
    return [location.longitude, location.latitude];
};

describe("filter-polygon", function () {

    it("returns true for points within polygon", function (done) {

        const tests = [snowdon, caernarfon, barBach, machynlleth];

        filterPolygon(caernarfonBoundary, tests, coordinate)
            .then(function (filteredResults) {
                
                if (filteredResults.length !== 2) {
                    done(new Error(`Failed validation on: ${filteredResults}`));
                } else {

                    const success = filteredResults.reduce(function(acc, value) {
                        const isValid = (value.latitude == caernarfon.latitude || value.latitude == barBach.latitude);
                        return (!isValid) ? false : acc ;
                    }, true);

                    if (success) {
                        done();
                    } else {
                        done(new Error("Returned a result out of boundary"));
                    }
                }
            });

    });

    it("returns false for points outside polygon", function (done) {

        const tests = [snowdon, caernarfon, barBach, machynlleth];

        filterPolygon(wem, tests, coordinate)
            .then(function (filteredResults) {
                
                if (filteredResults.length !== 0) {
                    done(new Error(`Returned points outside polygon: ${filteredResults}`));
                } else {
                    done();
                }
            });


    });

});