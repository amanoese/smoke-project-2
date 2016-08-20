var Cylon = require('cylon');
var json2csv = require('json2csv');
var fs = require('fs');

Cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
    bmp180: { driver: 'bmp180' },
    pin: { driver: 'direct-pin', pin: 8 }
  },

  work: function(my) {
    var fileName = `./outfile/outfile-${Date.now()}.csv`;
    fs.writeFile(fileName,'temperature\n');

    var size = 0;
    var iteration = 0;
    every(200, function() {
       iteration = (iteration+1) % 10;
       my.pin.digitalWrite(+!!(iteration < size));
    });
    every((2).seconds(), function() {
      my.bmp180.getAltitude(1, null, function(err, val) {
        if (err) {
          console.log(err);
          return;
        }
        size = parseInt(val.temp.fromScale(30,33).toScale(0,10));
        console.log("\tTemperature: " + val.temp + "\titeration:" + size);
        fs.appendFile(fileName,val.temp + '\n');
      });
    });
  }
}).start();

