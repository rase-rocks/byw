const defaultResultsPerPage = 10;

export const pageResults = function (items = [], pageNo = 1, resultsPerPage = defaultResultsPerPage) {

    const start = (pageNo - 1) * resultsPerPage;
    const end = start + resultsPerPage;

    return items.slice(start, end);
};

export const pageCount = function (count = 0, resultsPerPage = defaultResultsPerPage) {
    return Math.ceil(count / resultsPerPage);
};