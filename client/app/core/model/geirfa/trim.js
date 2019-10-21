import { whitespaceStartRe, whitespaceEndRe } from "../regular-expressions";

export default function trim(str) {
    return str.replace(whitespaceStartRe, "").replace(whitespaceEndRe, "");
}