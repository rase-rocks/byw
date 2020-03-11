const fs = require("fs");

const json = JSON.parse(fs.readFileSync("./seo-hacks/seo-pages.json").toString());

json.forEach(function(pageData) {

    fs.writeFileSync(`./seo-hacks/pages/${pageData.pageName}`, pageData.html);

});