module.exports = (data, coordinates, cb) ->
  if data.gps?
    lat = data.gps.GPSLatitude
    lon = data.gps.GPSLongitude
    latRef = data.gps.GPSLatitudeRef
    lonRef = data.gps.GPSLongitudeRef
    lat = (lat[0] + lat[1]/60 * lat[2]/3600) * (latRef == 'N' ? 1 : -1)
    lon = (lon[0] + lon[1]/60 * lon[2]/3600) * (lonRef == 'W' ? -1 : 1)
    source = LatLon lat, lon
    destination = LatLon coordinates[0], coordinates[1]

    distance = Number(String(source.distanceTo(destination)).split('.')[0])

    return cb null, { distance: distance }

Number.prototype.toRadians = ->
  return this * Math.PI / 180

LatLon = (lat, lon) ->
  if (!(this instanceof LatLon))
    return new LatLon(lat, lon)

  this.lat = Number(lat)
  this.lon = Number(lon)

LatLon.prototype.distanceTo = (destination) ->
  R = 6371000
  dLat = (destination.lat-this.lat).toRadians()
  dLon = (destination.lon-this.lon).toRadians()
  a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.lat.toRadians()) * Math.cos(destination.lat.toRadians()) *
    Math.sin(dLon/2) * Math.sin(dLon/2)

  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  d = R * c
  d = Math.round(d, 1)
  return d