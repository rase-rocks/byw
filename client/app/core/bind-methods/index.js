export default function (toObj, functionNames) {
    functionNames.forEach((name) => toObj[name].bind(toObj));
}