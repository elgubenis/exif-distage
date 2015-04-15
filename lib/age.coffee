module.exports = (data, date, cb) ->
  console.log data
  date = date.getTime()
  data = (if data.image? then data.image.ModifyDate) || (if data.exif? then data.exif.DateTimeOriginal)

  if data?
    dataSplit = data.split(' ')
    [ dataDate, dataTime ] = dataSplit
    if dataDate? && dataTime?
      dataDate = dataDate.replace new RegExp(':', 'g'), '-'
      dataTime = dataTime.replace new RegExp('-', 'g'), ':'
      dataDate = new Date(dataDate + ' ' + dataTime)
      
      seconds = dataDate.getTime()
      passed = (date-seconds)/1000
      passedObj = { age: String(passed).toHHMMSS() }
      passedObj.queryTimestamp = Math.round(date/1000, 0)
      passedObj.creationTimestamp = Math.round(seconds/1000, 0)

      return cb null, passedObj
  return cb new Error 'Wrong date format (YYYY-MM-DD HH:MM:SS)'

String.prototype.toHHMMSS = ->
  sec_num = parseInt(this, 10)
  hours   = Math.floor(sec_num / 3600)
  minutes = Math.floor((sec_num - (hours * 3600)) / 60)
  seconds = sec_num - (hours * 3600) - (minutes * 60)

  time    = hours + ':' + minutes + ':' + seconds
  return {
    h: hours
    m: minutes
    s: seconds
  }