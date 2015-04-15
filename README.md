# exif-distage

Get age in **h:m:s** format (from a supplied dateTime) and/or distance in meters (from supplied GPS lat, lon) of an image with an EXIF source.

### Install
```sh
$ cd /your/project-folder
$ npm install exif-distage --save
```

### Testing
```sh
$ sudo install -g mocha
$ cd /node_modules/exif-distage
$ npm test
```

## How to use

##### In Javascript
```javascript
var distage = require('exif-distage');
distage.parse('image.jpg', new Date(), [19.003725787037036, 99.00135592592591], function(err, response) {
  if (err) { throw err };
  console.log(response);
});
```
##### should return an object similar to this
```javascript
{
    age: {
        h: 1,
        m: 0,
        s: 0
    },
    queryTimestamp: 1429024373,
    creationTimestamp: 1429020773,
    distance: 1000000
}
```

## License
MIT