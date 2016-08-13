var Cylon = require('cylon');

Cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
    bmp180: { driver: 'bmp180' },
    led: { driver: 'led', pin: 15 }
  },

  work: function(my) {
    every((2).seconds(), function() {
      my.bmp180.getAltitude(1, null, function(err, val) {
        if (err) {
          console.log(err);
          return;
        }
        var ledBrite = parseInt(val.temp.fromScale(30,33).toScale(0, 255));
        my.led.brightness(ledBrite);
        console.log("\tledBrite: " + ledBrite,"\tTemperature: " + val.temp + " C","\tPressure: " + val.press + " Pa", "\tAltitude: " + val.alt + " m");
      });
    });
  }
}).start();
