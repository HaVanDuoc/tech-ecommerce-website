const cloudinary = require("cloudinary").v2

const destroyUpload = (files) => {
    files.map((item) => cloudinary.uploader.destroy(item.filename))
}

module.exports = destroyUpload
