// this example reproduce a file audio
var player = require('play-sound')(opts = {})

 player.play('./aaa.mp3', function (err) {
   if (err) throw err;
   console.log("Audio finished");
 });
