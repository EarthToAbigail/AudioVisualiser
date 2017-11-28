// check if the default naming is enabled, if not use the chrome one.

    var context = new (window.AudioContext || window.webkitAudioContext)();
    var audioBuffer;
    var sourceNode;

    // load the sound
    setupAudioNodes();
    loadSound("AlteredReality.mp3");

    function setupAudioNodes() {
        // Setup a javascript node
        jsNode = context.createScriptProcessor(2048, 1, 1);
        // Connect to destination else it isn't called
        jsNode.connect(context.destination);

        //setup analyser
        analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0.5;
        // analyser.fftSize = 1024;
        analyser.fftSize = 512; //frequency spectrum

        // create a buffer source node
        sourceNode = context.createBufferSource();

        // var myAudio = document.getElementById('audio-element');
        // sourceNode = context.createMediaElementSource(myAudio);

        //Connect the source to the analyser
        sourceNode.connect(analyser);

        //we use the javascript node to draw at a specific interval
        analyser.connect(jsNode);

        // and connect to destination
        sourceNode.connect(context.destination);
    }

    // load the specified sound
    function loadSound(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        // When loaded decode the data
        request.onload = function() {

            // decode the data
            context.decodeAudioData(request.response, function(buffer) {
                // when the audio is decoded play the sound
                playSound(buffer);
            }, onError);
        }
        request.send();
    }

    function playSound(buffer) {
        sourceNode.buffer = buffer;
        sourceNode.start(0);
    }

    // log if an error occurs
    function onError(e) {
        console.log(e);
    }

    //Creating our drawing area
    var canvas = document.getElementById('fft');
    var ctx = canvas.getContext('2d');

    // when the javascript node is called we use information from the analyzer node
    // to draw the volume
    jsNode.onaudioprocess = function() {

      // get the average, bincount is fftsize / 2
      var array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      var average = getAverageVolume(array);

      //For drawing simple volume bar without canvas
      // var volumeBars = document.getElementById("volumeBar");

      var gradient = ctx.createLinearGradient(0,0,0,300);
      gradient.addColorStop(1,'#ffffff');
      gradient.addColorStop(0.75,'#ff00ff');
      gradient.addColorStop(0.25,'#00ffff');
      gradient.addColorStop(0,'#ffffff');

      // clear the current state
      // ctx.clearRect(0, 0, 60, 130); //for simple volume bar
      ctx.clearRect(0, 0, 1000, 325);
      // set the fill style
      ctx.fillStyle = gradient;

      // create the meters
      // ctx.fillRect(0, 130 - average, 25, 130); // Used for creating a simple volume bar
      drawSpectrum(array); //This function allows to draw a frequency spectrum
      drawRectangles(average);
      drawLetters(average);

      // If we ever want to go back to pure html/css (no canvas)
      // volumeBars.style.height = average + 20 + "px";
      // volumeBars.innerHTML = Math.floor(average);

    }

    function drawLetters(value) {
      ctx.font = "20px Arial";
      ctx.strokeStyle = '#66ff99';

      ctx.strokeText("E", 105 - ((value / Math.PI) / 2), 25 + ((value / Math.PI) / 2));
      ctx.strokeText("+",142 , 25 + (value / 2.5));
      ctx.strokeText("A",180 + (value / Math.PI), 25 + ((value / Math.PI)*2));
    }

    function drawRectangles(value) {
      // for (var i = 0; i < array.length; i++) {
        // var value = array[i];
        ctx.strokeStyle = 'fuchsia';
        ctx.strokeRect(180, 40, 15 + (value/2), 15 + (value/2));
        ctx.strokeStyle = '#ffff80';
        ctx.strokeRect(120, 60, 15 - (value/2), 15 - (value/2));
      // }
    }

    function drawSpectrum(array) {
      for (var i = 0; i < array.length; i++) {
        var value = array[i];
        ctx.fillRect(i * 5, 325 - value, 3, 325);
      }
    }

    function getAverageVolume(array) {
      var values = 0;
      var average;

      var length = array.length;

      //get all the frequency amplitudes
      for (var i = 0; i < length; i++) {
        values += array[i];
      }

      average = values / length;
      return average;
    }


// Reference: http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound
// Reference: https://stackoverflow.com/questions/32980375/audio-reactive-visual-using-web-audio-api
