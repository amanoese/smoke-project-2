var Cylon = require('cylon');
var json2csv = require('json2csv');
var moment = require('moment');
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
    var fileName = `./outfile/outfile_${moment().format('MM-DD_hh:mm')}.csv`;
    fs.writeFile(fileName,'date,temperature,outvalue\n');

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
        var data = `${moment().format('hh:mm:ss')},${val.temp},${tapModule.size}\n`;
        process.stdout.write(data);
        fs.appendFile(fileName,data);
      });
    });
  }
}).start();

