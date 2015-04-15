var fs = require('fs');

fs.readFile('./image.jpg', 'binary', function(error, data) {
  console.log('never entering, not even with an error');
});

fs.readFile('./image.jpg', function(error, data) {
  console.log('never entering, not even with an error');
});

var data = fs.readFileSync('./image.jpg');
console.log('works as expected, data now contains a buffer of the image');

var data2 = fs.readFileSync('./image.jpg', 'binary');
console.log('works as expected, data2 now contains binary code of the image');
