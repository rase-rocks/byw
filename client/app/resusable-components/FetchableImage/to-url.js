

const imageToCtx = function (url) {
    return function (pipeline) {
        return new Promise(function (resolve) {
            const img = new Image();
            img.onload = function () {
                pipeline.canvas.width = img.naturalWidth;
                pipeline.canvas.height = img.naturalHeight;
                pipeline.ctx.drawImage(img, 0, 0);
                resolve(pipeline);
            };
            img.src = url;
        });
    };
};

// const applyFilter = function (fltr) {
//     return function (pipeline) {
//         return new Promise(function (resolve) {
//             const width = pipeline.canvas.width;
//             const height = pipeline.canvas.height;
//             fltr(pipeline.ctx.getImageData(0, 0, width, height))
//                 .then(function (pixels) {
//                     pipeline.ctx.putImageData(pixels, 0, 0);
//                     resolve(pipeline);
//                 });
//         });
//     };
// };

const toUri = function (pipeline) {
    return new Promise(function (resolve) {
        resolve(pipeline.canvas.toDataURL());
    });
};

const toCSSUrl = function (dataUri) {
    return new Promise(function (resolve) {
        resolve(`url("${dataUri}")`);
    });
};

const makeUrl = function () {

    let _canvas = undefined;
    let _ctx = undefined;

    return function (url) {

        const getCanvas = function () {
    
            return new Promise(function (resolve) {
                if (!_canvas) {
                    _canvas = document.createElement("canvas");
                }
                _canvas.width = 100;
                _canvas.height = 100;
                resolve({ canvas: _canvas});
            });
    
        };
    
        const getCtx = function (pipeline) {
            const canvas = pipeline.canvas;
            return new Promise(function (resolve) {
                if (!_ctx) {
                    _ctx = canvas.getContext("2d");
                }
                _ctx.clearRect(0, 0, canvas.width, canvas.height);
                resolve(Object.assign(pipeline, { ctx: _ctx }));
            });
        };
    
        return getCanvas()
            .then(getCtx)
            .then(imageToCtx(url))
            .then(toUri)
            .then(toCSSUrl);
    
    };
};

export default makeUrl();