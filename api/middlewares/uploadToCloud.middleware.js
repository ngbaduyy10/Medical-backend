const uploadToCloud = require('../../helpers/uploadToCloud.helper');

module.exports.uploadFile = async (req, res, next) => {
    if (req.file) {
        const result = await uploadToCloud.upload(req.file.buffer);
        req.body[req.file.fieldname] = result;
    }
    next();
}

module.exports.uploadFields = async (req, res, next) => {
    if (req.files) {
        for (let file in req.files) {
            req.body[file] = [];

            const array = req.files[file];
            for (const item of array) {
                const result = await uploadToCloud.upload(item.buffer);
                req.body[file].push(result);
            }
        }
    }
    next();
}