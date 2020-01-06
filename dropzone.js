function setup() {
  const dropzone = select('#dropZone');
  dropzone.drop(gotFile);
}

function gotFile(file) {
  sound = loadSound(file.data, loadIt);
}

function loadIt() {
  player.buffer.load(sound.url);
  bufferDuration = sound.buffer.duration;
  player.loopEnd = bufferDuration;
  $('#rangeSlider').slider("option", "max", bufferDuration);
  $('#rangeSlider').slider("option", 'values', [0,bufferDuration]);
  $('#rangeHandle2').text(Math.floor(bufferDuration));
}