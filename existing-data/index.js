/*
*
* A Node script to convert from raw json (which is taken from csv file) into cut down version
* ready for use in the API
*
* Note: The paths used are relative to root as this script is run by a npm run command from 
* package.json
*/

const fs = require("fs");

const csvFilePath = "./existing-data/Outlet Data 110518.csv";
const csv = require("csvtojson");
const parseCategory = require("./parse-category").default;
const parsePostcode = require("./parse-postcode").default;
const locations = [];

console.log("** Starting Conversion - ", csvFilePath);

csv()
    .fromFile(csvFilePath)
    .on("json", (location) => {
        locations.push(location);
    })
    .on("done", (error) => {

        const output = locations.map(outlet => {
            return {
                name: outlet.Name,
                address: outlet.Address,
                postcode: parsePostcode(outlet.Address),
                coordinates: [outlet.Longitude, outlet.Latitude],
                category: parseCategory(outlet.Category)
            };
        });
        
        fs.writeFileSync("./static-api/public/data", JSON.stringify(output));

        console.log("** Completed with error: ", (error) ? error : "None");

    });



