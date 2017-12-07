# AudioVisualiser :headphones: :musical_note:

AudioVisualizer is a small experimentation in audio reactive design using Javascript and the WEBAudio api. My goal was to become comfortable in processing audio directly in the browser to create hands free VJing applications designed to be used in live music performances. 

Right now the app has a small list of songs from which the user can choose from. Once a song is chosen, it is loaded in the buffer and the visuals are fired by calculating the amplitude frequencies through the WEBAudio api and using those calculations to dynamically influence the visual design through Canvas.

I would like to give credits to jos.dirksen who posted an amazing tutorial on the WEBAudio api on Smartjava.org and from which the code helped me get started in this exploration.

## Next Steps :construction: :soon:

I'm still trying to figure out a way of being able to stop, pause and choose a different track in the same session (without reloading the page) but it seems like once a buffer is loaded for a track it cannot be nullified to load a different track without reloading. :confused: 
My next step would be to experiment with audio tags from HTML5 in the hopes that this would fix the problem. As mentioned previously, the end goal at this point would be to eventually process the sound from the input of my computer and not only pre-recorded tracks. 

The app uses Node.js on the backend and is hosted on Heroku. All the songs present in the playlist are my own.

## References :clap: :star2:

http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound
https://stackoverflow.com/questions/32980375/audio-reactive-visual-using-web-audio-api

If you like this small experimentation or this helped you create something of your own that you would like to share or if you have any suggestions for improvements, please feel free to contact me!

:point_right: https://twitter.com/EarthAbigail <br>
:point_right: www.facebook.com/EarthToAbigail


