const path = require('path');
const multer = require('multer');


const storageSpace = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },

    filename: (req, file, cb) => {
        return cb(null, file.fieldname + '_' + Date.now().toString() + path.extname(file.originalname))
    },
});

const imageHandler = multer({
    storage: storageSpace,
    fileFilter: function (req, file, callback) { 
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg'
            && ext !== '.jpeg') {
            req.fileValidationError = "Invalid file extension";
            callback(null, false, req.fileValidationError)
        }
        callback(null, true)
    },
}).single('img');

const imagesHandler = multer({
    storage: storageSpace,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg'
            && ext !== '.jpeg') {
            req.fileValidationError = "Invalid file extension";
            callback(null, false, req.fileValidationError)
        }
        callback(null, true)
    },
}).fields([
    { name: 'land_img', maxCount: 1 },
    { name: 'plan_img', maxCount: 1 }
]);

module.exports = {imageHandler, imagesHandler}