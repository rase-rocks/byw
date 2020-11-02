export default function scriptObject(keys) {
    const objBody = keys
        .map(key => `${key}: "${key}"`)
        .join(", \n    ");
    return `{
    ${objBody}
}`;
}