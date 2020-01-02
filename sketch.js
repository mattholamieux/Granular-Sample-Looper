let player;
let samp;
let reverb, delay, chorus, compressor, filter;
let dropzone;
let sound;
let sampDuration;

function preload() {
  samp = loadSound('loops/loop0.wav');
}

function setup() {
  dropzone = select('#dropZone');
  initFX();
  dropzone.drop(gotFile);
  sampDuration = samp.buffer.duration;
  player = new Player();
  player.loadSamp(samp.url);
  player.player.chain(delay, filter);

  $( "#tabs" ).tabs();
  $('#rangeSlider').slider({
    range: true,
    min: 0,
    max: sampDuration,
    step: 0.01,
    values: [0, sampDuration],
    slide: function() {
      player.player.loopStart = ($(this).slider('values', 0));
      player.player.loopEnd = ($(this).slider('values', 1));
      // console.log($(this).slider('values', 1))
      $("#rangeAmount").val($(this).slider('values', 0));
      $("#rangeAmount2").val($(this).slider('values', 1));
    }
  });
  $("#detuneSlider").slider({
    max: 1300,
    min: -1300,
    step: 100,
    value: 0,
    slide: function() {
      player.player.detune = ($(this).slider('value'));
      $("#detuneAmount").val($(this).slider("value"));
    }
  });
  $('#rateSlider').slider({
    max: 2,
    min: 0.000001,
    step: 0.125,
    value: 1,
    slide: function() {
      player.player.playbackRate = ($(this).slider('value'));
      $("#rateAmount").val($(this).slider("value"));
    }
  });
  $('#grainSizeSlider').slider({
    max: 2,
    min: 0.01,
    step: 0.01,
    value: 0.5,
    slide: function() {
      player.player.grainSize = ($(this).slider('value'));
      $("#grainAmount").val($(this).slider("value"));
    }
  });
  $('#overlapSlider').slider({
    max: 2,
    min: 0.01,
    step: 0.01,
    value: 0.1,
    slide: function() {
      player.player.overlap = ($(this).slider('value'));
      $("#overlapAmount").val($(this).slider("value"));
    }
  });
  $('#checkbox-1').checkboxradio({
    icon: false
  });
  $('#checkbox-1').on('click', function() {
    if ($(this).is(":checked")) {
      player.player.reverse = true;
    } else {
      player.player.reverse = false;
    }
  });
  $('#startButton').on('click', function() {
    player.start();
  });
  $('#stopButton').on('click', function() {
    player.stop();
  });

}

class Player {
  constructor() {
    this.player = new Tone.GrainPlayer();
    this.player.loop = true;
  }

  start() {
    this.player.start();
  }

  stop() {
    this.player.stop();
  }

  loadSamp(s) {
    this.player.buffer.load(s);
  }

}


function initFX() {
  compressor = new Tone.Compressor({
    ratio: 12,
    threshold: -24,
    release: 0.25,
    attack: 0.003,
    knee: 30
  });
  compressor.connect(Tone.Master);
  reverb = new Tone.Freeverb().connect(compressor);
  delay = new Tone.PingPongDelay().connect(compressor);
  chorus = new Tone.Chorus().connect(compressor);
  filter = new Tone.Filter(1000, 'lowpass').connect(compressor);
  delay.wet.value = 1;
  delay.delayTime.value = "16n";
  delay.feedback.value = 0.5;
  reverb.wet.value = 0.5;
  reverb.roomSize.value = 0.2;
  reverb.dampening.value = 3000;
  chorus.frequency.value = 1;
  chorus.delayTime = 3;
  chorus.depth = 0.5;
}

function gotFile(file) {
  sound = loadSound(file.data, loadIt);
}

function loadIt() {
  player.loadSamp(sound.url);
  sampDuration = sound.buffer.duration;
  player.loopEnd = sampDuration;
  endSliderVal = sampDuration;
  $('#rangeSlider').slider("option", "max", sampDuration);
}