/* global describe it */

const expect = require("chai").expect;

const polygonContains = require("../client/app/core/model/polygon-contains").default;

const dataCoordinateToGeoJsonPoint = function (coord) {
    return [coord.longitude, coord.latitude];
};

const boundingCoordinates = [
    [
        -4.9143407883402324,
        52.724594188467151
    ],
    [
        -4.7746983321583629,
        53.420028476265308
    ],
    [
        -4.3807584996448128,
        53.632025369464948
    ],
    [
        -3.9712107260489398,
        53.387081008581873
    ],
    [
        -3.4423089123260358,
        53.315838094204722
    ],
    [
        -3.0514833600081039,
        53.215057060157463
    ],
    [
        -2.5787481029900028,
        52.871752563637394
    ],
    [
        -2.831497608161512,
        52.585469626145986
    ],
    [
        -4.2637448041334673,
        52.541368677804961
    ],
    [
        -4.9143407883402324,
        52.724594188467151
    ]
];

const snowdon = {
    latitude: 53.0685,
    longitude: -4.07625
};

const caernarfon = {
    latitude: 53.141305555555554,
    longitude: -4.276
};

const bala = {
    latitude: 52.905799,
    longitude: -3.605332
};

const machynlleth = {
    latitude: 52.590722222222226,
    longitude: -3.8493333333333335
};

const llanuwchllyn = {
    latitude: 52.899780,
    longitude: -3.722104
};

const carmarthen = {
    latitude: 51.85347222222222,
    longitude: -4.310138888888889
};

const llandeilo = {
    latitude: 51.885501, 
    longitude: -3.993267
};

const insidePoints = [snowdon, llanuwchllyn, machynlleth, bala, caernarfon].map(dataCoordinateToGeoJsonPoint);
const outsidePoints = [carmarthen, llandeilo].map(dataCoordinateToGeoJsonPoint);

describe("point-in-polygon", function () {

    it("correctly identifies point in polygon", function () {
        insidePoints.forEach(point => {
            expect(polygonContains(point, boundingCoordinates)).to.equal(true);
        });
    });

    it("correctly identifies point out of polygon", function () {
        outsidePoints.forEach(point => {
            expect(polygonContains(point, boundingCoordinates)).to.equal(false);
        });
    });

});