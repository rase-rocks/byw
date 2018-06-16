export default function (event, defaultValue = 20) {
    const result = parseFloat(event.target.innerHTML);
    return (isNaN(result)) ? defaultValue : result;
}