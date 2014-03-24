(function() {
  var xD = document.getElementById('x'),
      yD = document.getElementById('y'),
      zD = document.getElementById('z'),
      socket = io.connect();
  
  
  function motionHandler(e) {
    var x = e.accelerationIncludingGravity.x,
        y = e.accelerationIncludingGravity.y,
        z = e.accelerationIncludingGravity.z,
        coordinates = {
          x: x,
          y: y,
          z: z
        }
    
    xD.innerHTML = x;
    yD.innerHTML = y;
    zD.innerHTML = z;
    
    socket.emit('coordinates', coordinates);
    
  }
  
  if(window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', motionHandler, true);
  }
}());