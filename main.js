let player, compressor, delay, filter, reverb, recorder, recDest;

$(document).ready(function() {
  $("#tabs").tabs();
  $("#accordian").accordion();
  audioRecorder();
  initLFO();
  initFX();
  loadPlayer();
});

