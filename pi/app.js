var Cylon = require('cylon');
//var json2csv = require('json2csv');
var moment = require('moment');
var fs = require('fs');

var Controller = require('node-pid-controller');
var ctr = new Controller({
  k_p: 0.70,
  k_i: 0.07,
  k_d: 0.00,
  dt: 2,
  i_max : 10
});

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

    ctr.setTarget(63);
    tapModule.constructor(my.pin);
    every((2).seconds(), function() {
      my.bmp180.getAltitude(1, null, function(err, val) {
        if (err) {
          console.log(err);
          return;
        }
        var temp = val.temp.toFixed(2);
        tapModule.size = ctr.update(temp).toFixed(2);
        var data = `${moment().format('hh:mm:ss')},${temp},${tapModule.size}\n`;
        process.stdout.write(data);
        fs.appendFile(fileName,data);
        this.emmit('SOCKET_TEMPERATURE',temp)
      });
    });
  }
}).start();

Cylon.api('socketio',{
  host: 'localhost',
  port: '4000'
});

var tapModule = {
  size       : 0,
  iteration  : 0,
  constructor(pin) {
    this.pin = pin;
    every(200, () => {
      this.iteration = (this.iteration+1) % 10;
      pin.digitalWrite(+!!(this.iteration < this.size));
    });
  }
};

