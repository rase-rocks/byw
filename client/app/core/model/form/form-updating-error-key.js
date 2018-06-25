import update from "./update";

export default function (frm, key, error) {
    const existingValue = frm[key].value;
    return update(frm, key, existingValue, error);
}