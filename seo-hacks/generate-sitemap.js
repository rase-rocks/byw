const absoluteUrl = "https://www.byw.cymru";

const wrap = function (urlStringElements) {
    return `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlStringElements}
</urlset>`;
};

const lastMod = new Date().toISOString();

const makeUrlElement = function (route, priority) {
    return `\n    <url>
        <loc>${absoluteUrl}${route}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${priority}</priority>
    </url>`;
};

const urls = [
    { route: "/", priority: 1.0 },
    { route: "/map", priority: 0.8 },
    { route: "/vocabulary", priority: 0.8 },
    { route: "/about", priority: 0.8 },
    { route: "/submit", priority: 0.8 },
    { route: "/privacy", priority: 0.7}
].map(function (path) {
    return makeUrlElement(path.route, path.priority);
}).join("");

const sitemap = wrap(urls);

console.log(sitemap);


