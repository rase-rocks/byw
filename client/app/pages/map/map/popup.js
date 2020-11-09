import isBrowser from "../../../core/is-browser";
import { formattedDescription } from "../../../core/model/form/category";

const element = function (type, className) {
    const el = document.createElement(type);
    if (className && className !== "") el.setAttribute("class", className);
    return el;
};

const row = function (text) {
    const r = element("tr");
    const td = element("td");
    const txt = document.createTextNode(text);
    r.appendChild(td);
    td.appendChild(txt);
    return r;
};

const makeTableContainer = function () {
    const tbl = element("table", "table");
    return tbl;
};

const makeTable = function (name, address, category, buttonsRow) {
    const table = makeTableContainer();
    const body = element("tbody");

    table.appendChild(body);

    [
        row(name),
        row(address),
        row(formattedDescription(category)),
        buttonsRow
    ].forEach(rw => body.appendChild(rw));

    return table;
};

const button = function (label, handler) {
    const btn = element("button", "show-button");
    const lbl = document.createTextNode(label);
    btn.onclick = handler;
    btn.appendChild(lbl);
    return btn;
};

const buttons = function (location, onShow, onReview, showLabelText, categoriseLabelText) {
    const row = element("tr");
    const td = element("td", "popup-button-td");

    row.appendChild(td);

    if (onShow) {
        td.appendChild(button(showLabelText, onShow(location)));
    }

    if (onReview) {
        const handler = () => onReview(location);
        td.appendChild(button(categoriseLabelText, handler));
    }

    return row;
};

const popupContainer = function (location, onShow, onReview, showLabelText, categoriseLabelText) {
    const container = element("div");
    const table = makeTable(location.name, 
        location.address, 
        location.category,
        buttons(location, 
            onShow, 
            onReview, 
            showLabelText, 
            categoriseLabelText));
    
    container.appendChild(table);
    
    return container;
};

const popup = function (location, onShowLocation, onReview, showLabelText, categoriseLabelText) {

    if (!isBrowser()) {
        return `<p>${location.name}</p>`;
    }
    
    const element = popupContainer(location, onShowLocation, onReview, showLabelText, categoriseLabelText);

    return element;
};

export default popup;