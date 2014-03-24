(function() {
  var $msg = $('#msg');
      socket = io.connect(),
      qrURL = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&bgcolor=CCD1D9&data=" + document.location.href + '/mobile',
      path = document.location.pathname,
      room = path.slice(1);
      
  var opts = {
    lines: 12, // The number of lines to draw
    angle: 0, // The length of each line
    lineWidth: 0.44, // The line thickness
    pointer: {
      length: 0.9, // The radius of the inner circle
      strokeWidth: 0.035, // The rotation offset
      color: '#000000' // Fill color
    },
    limitMax: true,   // If true, the pointer will not go past the end of the gauge
    colorStart: '#6FADCF',   // Colors
    colorStop: '#DA4453',    // just experiment with them
    strokeColor: '#4A89DC',   // to see which ones work best for you
    generateGradient: true
  };
  var target = document.getElementById('graph'); // your canvas element
  var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
  gauge.maxValue = 20; // set max gauge value
  gauge.animationSpeed = 1; // set animation speed (32 is default value)
  gauge.set(10); // set actual value
  socket.on('connect', function(){
    socket.emit('subscribe', room);
  });
  socket.on('mobileconnected', function() {
    $msg.text("Mobile phone connected.");
  });
  
  socket.on('coordinates', function(data) {
    var normalized = data.z + 10;
    if (normalized < 0) {
      normalized = 0.1;
    }
    if (normalized > 20) {
      normalized = 20;
    }
    gauge.set(normalized);
  });
  $('#qr').html('<img src="' + qrURL + '" />');
}());