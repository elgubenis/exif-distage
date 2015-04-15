ExifImage = require('exif').ExifImage

module.exports = (imagePath, cb) ->
  new ExifImage
    image: imagePath
    , (err, data = null) ->
      cb err, data

