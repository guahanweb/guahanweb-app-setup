export default function (opts) {
    return function (options) {
        console.log(options);
        return options.fn(this);
    }
}