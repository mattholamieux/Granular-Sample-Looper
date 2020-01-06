function initFX() {
  compressor = new Tone.Compressor({
    ratio: 12,
    threshold: -24,
    release: 0.25,
    attack: 0.003,
    knee: 30
  });
  compressor.connect(recDest);
  compressor.connect(Tone.Master);
  reverb = new Tone.Freeverb().connect(compressor);
  delay = new Tone.PingPongDelay().connect(compressor);
  filter = new Tone.Filter().connect(compressor);
  filter.frequency.value = 6000;
  filter.type = "lowpass";
  filter.q = 1;
  delay.wet.value = 0;
  delay.delayTime.value = 0.125;
  delay.feedback.value = 0.125;
  reverb.wet.value = 0;
  reverb.roomSize.value = 0.5;
  reverb.dampening.value = 3000;
}

function initLFO() {
  lfo1 = new Tone.LFO(0.2, 0, 4000);
  lfo2 = new Tone.LFO(0.2, 0, 20);
  lfo3 = new Tone.LFO(0.2, 0, 1);
  lfo4 = new Tone.LFO(0.2, 0, 1);
  lfo5 = new Tone.LFO(0.2, 0, 1);
  lfo6 = new Tone.LFO(0.2, 0, 1);
  lfo7 = new Tone.LFO(0.2, 0, 1);
  lfo8 = new Tone.LFO(0.2, 0, 4000);
}