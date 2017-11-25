// check if the default naming is enabled, if not use the chrome one.
    if (!window.AudioContext) {
        if (!window.webkitAudioContext) {
            alert('no audiocontext found');
        } else {
          window.AudioContext = window.webkitAudioContext;
        }
    }

    var context = new AudioContext();
    var audioBuffer;
    var sourceNode;

    // load the sound
    setupAudioNodes();
    loadSound("Paradise.mp3");

    function setupAudioNodes() {
        // Setup a javascript node
        jsNode = context.createScriptProcessor(2048, 1, 1);
        // Connect to destintion else it isn't called
        jsNode.connect(context.destination);

        //setup analyser
        analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0.5;
        analyser.fftSize = 1024;

        // create a buffer source node
        sourceNode = context.createBufferSource();

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

    // when the javascript node is called we use information from the analyzer node
    // to draw the volume
    jsNode.onaudioprocess = function() {

       // get the average, bincount is fftsize / 2
      var array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      var average = getAverageVolume(array);

      var volumeBars = document.getElementById("volumeBar");

      volumeBars.style.height = average + 5 + "px";
      volumeBars.innerHTML = Math.floor(average);

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
