Number.prototype.toRad = function() { return this * Math.PI / 180; };
Number.prototype.toDeg = function() { return this * 180 / Math.PI; };

global.getPointAtDistance = function(lat, lon, brng, dist) {
  dist = dist / 6371000;
  brng = brng.toRad();
  var lat1 = lat.toRad(), lon1 = lon.toRad();
  var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) + 
                       Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));
  var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
                               Math.cos(lat1), 
                               Math.cos(dist) - Math.sin(lat1) *
                               Math.sin(lat2));
  if (isNaN(lat2) || isNaN(lon2)) return null;
  return [lat2.toDeg(), lon2.toDeg()];
};