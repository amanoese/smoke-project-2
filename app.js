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

    var tapModule = {
      size       : 0,
      iteration  : 0,
      init() {
        every(200, function() {
          this.iteration = (this.iteration+1) % 10;
          my.pin.digitalWrite(+!!(this.iteration < this.size));
        });
      }

    };
    tapModule.init();
    every((2).seconds(), function() {
      my.bmp180.getAltitude(1, null, function(err, val) {
        if (err) {
          console.log(err);
          return;
        }
        tapModule.size = parseInt(val.temp.fromScale(30,33).toScale(0,10));
        console.log("\tTemperature: " + val.temp + "\titeration:" + tapModule.size);
        fs.appendFile(fileName,val.temp + '\n');
      });
    });
  }
}).start();

