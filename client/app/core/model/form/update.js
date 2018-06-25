import item from "./item";

export default function (frm, key, value, error = "") {

    return Object.assign(
        {},
        frm,
        { [key]: item(key, value, error) });

}