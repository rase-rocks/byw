export default function (fn, count) {

    const start = new Date().getTime();

    for (let i = 0; i < count; i++) {
        fn();
    }

    const end = new Date().getTime();
    return end - start;
}