export default function quotedHint(value) {
    return value.startsWith("\"") ? value : `"${value}"`;
}