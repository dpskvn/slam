(function() {
  var xD = document.getElementById('x'),
      yD = document.getElementById('y'),
      zD = document.getElementById('z'),
      socket = io.connect(),
      path = document.location.pathname,
      room = path.slice(1, -7);
  
  
  function motionHandler(e) {
    var x = e.accelerationIncludingGravity.x,
        y = e.accelerationIncludingGravity.y,
        z = e.accelerationIncludingGravity.z,
        coordinates = {
          x: x,
          y: y,
          z: z,
          room: room
        }
    
    xD.innerHTML = x;
    yD.innerHTML = y;
    zD.innerHTML = z;
    socket.on('connect', function(){
      socket.emit('subscribe', room);
    });
    socket.emit('coordinates', coordinates);
    
  }
  
  if(window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', motionHandler, true);
  }
}());