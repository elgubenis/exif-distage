_         = require 'underscore'
exif      = require './exif'
age       = require './age'
distance  = require './distance'

module.exports = (imagePath, date, latlon, cb) ->

  # todo, make this more simple
  if (date !instanceof Date && date instanceof Array)
    newLatlon = date
    date = null

  if (latlon !instanceof Array && latlon instanceof Date)
    newDate = latlon
    latlon = null

  if (typeof latlon == 'function')
    cb = latlon
    latlon = null
  if (typeof date == 'function')
    cb = date
    date = null

  if newLatlon? then latlon = newLatlon
  if newDate? then date = newDate
  # todo end

  exif imagePath, (err, data) ->
    if err then return cb err
    result = {}

    if date? then await age data, date, defer err, ageResponse
    if latlon? then await distance data, latlon, defer err, distanceResponse

    _.extend result, ageResponse
    _.extend result, distanceResponse
    return cb null, result
