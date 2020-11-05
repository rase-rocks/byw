import isBrowser from "../../../core/is-browser";
import { formattedDescription } from "../../../core/model/form/category";

const element = function (type, className) {
    const el = document.createElement(type);
    el.setAttribute("class", className);
    return el;
};

const row = function (text) {
    const r = document.createElement("tr");
    const td = document.createElement("td");
    const txt = document.createTextNode(text);
    r.appendChild(td);
    td.appendChild(txt);
    return r;
};

const makeTableContainer = function () {
    const tbl = element("table", "table");
    return tbl;
};

const makeTable = function (name, address, category) {
    const table = makeTableContainer();
    const body = document.createElement("tbody");

    table.appendChild(body);

    [
        row(name),
        row(address),
        row(formattedDescription(category))
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

const appendWrappedBtn = function (container, label, handler) {
    const btn = button(label, handler);
    const col = element("div", "col-md-6 text-center");
    col.appendChild(btn);
    container.appendChild(col);
    return col;
};

const buttons = function (location, onShow, onReview, showLabelText, categoriseLabelText) {
    const wrapper = element("div", "row");

    if (onShow) {
        appendWrappedBtn(wrapper, showLabelText, onShow(location));
    }

    if (onReview) {
        const handler = () => onReview(location);
        appendWrappedBtn(wrapper, categoriseLabelText, handler);
    }

    return wrapper;
};

const popupContainer = function (location, onShow, onReview, showLabelText, categoriseLabelText) {
    const container = document.createElement("div");
    const table = makeTable(location.name, location.address, location.category);
    
    container.appendChild(table);
    container.appendChild(buttons(location, onShow, onReview, showLabelText, categoriseLabelText));
    
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