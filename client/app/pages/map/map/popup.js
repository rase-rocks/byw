import isBrowser from "../../../core/is-browser";

const row = function (text) {
    const r = document.createElement("tr");
    const td = document.createElement("td");
    const txt = document.createTextNode(text);
    r.appendChild(td);
    td.appendChild(txt);
    return r;
};

const makeTableContainer = function () {
    const tbl = document.createElement("table");
    tbl.setAttribute("class", "table");
    return tbl;
};

const makeTable = function (name, address) {
    const table = makeTableContainer();
    const body = document.createElement("tbody");

    table.appendChild(body);

    [
        row(name),
        row(address)
    ].forEach(rw => body.appendChild(rw));

    return table;
};

const button = function (label, handler) {
    const btn = document.createElement("button");
    btn.setAttribute("class", "show-button");
    const lbl = document.createTextNode(label);
    btn.onclick = handler;
    btn.appendChild(lbl);
    return btn;
};

const popupContainer = function (location, handler) {
    const container = document.createElement("div");
    const table = makeTable(location.name, location.address);
    
    container.appendChild(table);

    if (handler) {
        const clickHandler = handler(location);
        const btn = button("Show", clickHandler);
        container.appendChild(btn);
    }
    
    return container;
};

const popup = function (location, onShowLocation) {

    if (!isBrowser()) {
        return `<p>${location.name}</p>`;
    }
    
    const element = popupContainer(location, onShowLocation);

    return element;
};

export default popup;