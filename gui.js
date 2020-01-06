function guiControls () {
  let bufferDuration = player.buffer.duration;
  // Start Button
  const $startButton = $('#startButton');
  $startButton.checkboxradio({
    icon: false
  });
  $startButton.on('click', function() {
    if ($(this).is(':checked')) {
      player.start();
    } else {
      player.stop();
    }
  });
  // reverse Button
  const $reverseButton = $('#reverseButton');
  $reverseButton.checkboxradio({
    icon: false
  });
  $reverseButton.on('click', function() {
    if ($(this).is(":checked")) {
      player.reverse = true;
    } else {
      player.reverse = false;
    }
  });
  // record Button
  const $recordButton = $('#recordButton');
  $recordButton.checkboxradio({
    icon: false
  });
  $recordButton.on('click', function() {
    if ($(this).is(":checked")) {
      // chunks = [];
      recorder.start();
    } else {
      recorder.stop();
    }
  });
  // range Slider
  const $rangeSlider = $('#rangeSlider');
  const $rangeHandle1 = $('#rangeHandle1');
  const $rangeHandle2 = $('#rangeHandle2');
  $rangeSlider.slider({
    range: true,
    min: 0,
    max: bufferDuration,
    step: 0.01,
    values: [0, bufferDuration],
    slide: function() {
      player.loopStart = ($(this).slider('values', 0));
      player.loopEnd = ($(this).slider('values', 1));
      $rangeHandle1.text($(this).slider("values", 0));
      $rangeHandle2.text($(this).slider("values", 1));
    }
  });
  // detune Slider
  const $detuneSlider = $('#detuneSlider');
  const $detuneHandle = $('#detuneHandle');
  $detuneSlider.slider({
    max: 1300,
    min: -1300,
    step: 100,
    value: 0,
    slide: function() {
      player.detune = ($(this).slider('value'));
      $detuneHandle.text(($(this).slider('value'))/100);
    }
  });
  // Rate Slider
  const $rateSlider = $('#rateSlider');
  const $rateHandle = $('#rateHandle');
  $rateSlider.slider({
    max: 2,
    min: 0.125,
    step: 0.125,
    value: 1,
    slide: function() {
      player.playbackRate = ($(this).slider('value'));
      $rateHandle.text($(this).slider('value'));
    }
  });
  // Grain Slider
  const $grainSlider = $('#grainSizeSlider');
  const $grainHandle = $('#grainHandle');
  $grainSlider.slider({
    max: 2,
    min: 0.01,
    step: 0.01,
    value: 0.5,
    slide: function() {
      player.grainSize = ($(this).slider('value'));
      $grainHandle.text($(this).slider('value'));
    }
  });
  // Overlap Slider
  const $overlapSlider = $('#overlapSlider');
  const $overlapHandle = $('#overlapHandle');
  $overlapSlider.slider({
    max: 2,
    min: 0.01,
    step: 0.01,
    value: 0.1,
    slide: function() {
      player.overlap = ($(this).slider('value'));
      $overlapHandle.text($(this).slider('value'));
    }
  });
  // FILTER Selector
  const $filterTypeButtons = $('.filterTypeRadios');
  $filterTypeButtons.checkboxradio({
    icon: false
  });
  $filterTypeButtons.on('click', function() {
    if ($(this).is(":checked")) {
      filter.type = ($(this).attr('id'));
    }
  });
  // Filter Frequency
  const $filterFreqSlider = $('#filterFreqSlider');
  const $filterFreqHandle = $('#filterFreqHandle');
  $filterFreqSlider.slider({
    max: 6000,
    min: 0,
    step: 0.01,
    value: 5000,
    slide: function() {
      filter.frequency.value = ($(this).slider('value'));
      let filterFreq = Math.floor($(this).slider('value'));
      $filterFreqHandle.text(filterFreq);
    }
  });
  // Filter Resonance
  const $filterQSlider = $('#filterQSlider');
  const $filterQHandle = $('#filterQHandle');
  $filterQSlider.slider({
    max: 20,
    min: 0,
    step: 0.01,
    value: 1,
    slide: function() {
      filter.Q.value = ($(this).slider('value'));
      $filterQHandle.text($(this).slider('value'));
    }
  });
  // Delay Mix
  const $delayMixSlider = $('#delayWetSlider');
  const $delayMixHandle = $("#delayWetHandle");
  $delayMixSlider.slider({
    max: 1,
    min: 0,
    step: 0.01,
    value: 0,
    slide: function() {
      delay.wet.value = ($(this).slider('value'));
      $delayMixHandle.text($(this).slider('value'));
    }
  });
  // Delay Time
  const $delayTimeSlider = $('#delayTimeSlider');
  const $delayTimeHandle = $('#delayTimeHandle');
  $delayTimeSlider.slider({
    max: 1,
    min: 0,
    step: 0.01,
    value: 0,
    slide: function() {
      delay.delayTime.value = ($(this).slider('value'));
      $delayTimeHandle.text($(this).slider('value'));
    }
  });
  // Delay Feedback
  const $delayFeedbackSlider = $('#delayFeedbackSlider');
  const $delayFeedbackHandle = $('#delayFeedbackHandle');
  $delayFeedbackSlider.slider({
    max: 1,
    min: 0,
    step: 0.01,
    value: 0,
    slide: function() {
      delay.feedback.value = ($(this).slider('value'));
      $delayFeedbackHandle.text($(this).slider('value'));
    }
  });
  //Reverb Mix
  const $reverbMixSlider = $('#reverbWetSlider');
  const $reverbMixHandle = $('#reverbWetHandle');
  $reverbMixSlider.slider({
    max: 1,
    min: 0,
    step: 0.01,
    value: 0,
    slide: function() {
      reverb.wet.value = ($(this).slider('value'));
      $reverbMixHandle.text($(this).slider('value'));
    }
  });
  // Reverb Time
  const $reverbTimeSlider = $('#reverbTimeSlider');
  const $reverbTimeHandle = $('#reverbTimeHandle');
  $reverbTimeSlider.slider({
    max: 1,
    min: 0,
    step: 0.01,
    value: 0,
    slide: function() {
      reverb.roomSize.value = ($(this).slider('value'));
      $reverbTimeHandle.text($(this).slider('value'));
    }
  });
  // Reverb Dampening
  const $reverbDampSlider = $('#reverbDampSlider');
  const $reverbDampHandle = $('#reverbDampHandle');
  $reverbDampSlider.slider({
    max: 6000,
    min: 0,
    step: 0.01,
    value: 0,
    slide: function() {
      reverb.dampening.value = ($(this).slider('value'));
      $reverbDampHandle.text($(this).slider('value'));
    }
  });

  // LFO SECTION
  // LFO One
  $('#lfo1-onOff').checkboxradio({
    icon: false
  });
  $('#lfo1-onOff').on('click', function() {
    if ($(this).is(":checked")) {
      lfo1.connect(filter.frequency);
      lfo1.start();
    } else {
      lfo1.disconnect(filter.frequency);
      filter.frequency.value = 4000;
      lfo1.stop();
    }
  });
  $(".lfo1ShapeRadios").checkboxradio({
    icon: false
  });
  $('.lfo1ShapeRadios').on('click', function() {
    if ($(this).is(":checked")) {
      let classString = (($(this).attr('class')).split(' '));
      lfo1.type = (classString[1]);
    }
  });
  $('#lfo1FreqSlider').slider({
    max: 10,
    min: 0,
    step: 0.01,
    value: 0.5,
    slide: function() {
      lfo1.frequency.value = ($(this).slider('value'));
    }
  });
  $('#lfo1AmpSlider').slider({
    max: 1,
    min: 0,
    step: 0.01,
    value: 1,
    slide: function() {
      lfo1.amplitude.value = ($(this).slider('value'));
    }
  });
  // LFO Two
  $('#lfo2-onOff').checkboxradio({
    icon: false
  });
  $('#lfo2-onOff').on('click', function() {
    if ($(this).is(":checked")) {
      lfo2.connect(filter.Q);
      lfo2.start();
    } else {
      lfo2.disconnect(filter.Q);
      filter.Q.value = 0;
      lfo2.stop();
    }
  });
  $(".lfo2ShapeRadios").checkboxradio({
    icon: false
  });
  $('.lfo2ShapeRadios').on('click', function() {
    if ($(this).is(":checked")) {
      let classString = (($(this).attr('class')).split(' '));
      lfo2.type = (classString[1]);
    }
  });
  $('#lfo2FreqSlider').slider({
    max: 10,
    min: 0,
    step: 0.01,
    value: 0.5,
    slide: function() {
      lfo2.frequency.value = ($(this).slider('value'));
    }
  });
  $('#lfo2AmpSlider').slider({
    max: 1,
    min: 0,
    step: 0.01,
    value: 1,
    slide: function() {
      lfo2.amplitude.value = ($(this).slider('value'));
    }
  });
  // LFO Three
  $('#lfo3-onOff').checkboxradio({
    icon: false
  });
  $('#lfo3-onOff').on('click', function() {
    if ($(this).is(":checked")) {
      lfo3.connect(delay.wet);
      lfo3.start();
    } else {
      lfo3.disconnect(delay.wet);
      delay.wet.value = 0;
      lfo3.stop();
    }
  });
  $(".lfo3ShapeRadios").checkboxradio({
    icon: false
  });
  $('.lfo3ShapeRadios').on('click', function() {
    if ($(this).is(":checked")) {
      let classString = (($(this).attr('class')).split(' '));
      lfo3.type = (classString[1]);
    }
  });
  $('#lfo3FreqSlider').slider({
    max: 10,
    min: 0,
    step: 0.01,
    value: 0.5,
    slide: function() {
      lfo3.frequency.value = ($(this).slider('value'));
    }
  });
  $('#lfo3AmpSlider').slider({
    max: 1,
    min: 0,
    step: 0.01,
    value: 1,
    slide: function() {
      lfo3.amplitude.value = ($(this).slider('value'));
    }
  });
  // LFO Four
  $('#lfo4-onOff').checkboxradio({
    icon: false
  });
  $('#lfo4-onOff').on('click', function() {
    if ($(this).is(":checked")) {
      lfo4.start();
      lfo4.connect(delay.delayTime);
    } else {
      lfo4.stop();
      lfo4.disconnect(delay.delayTime);
    }
  });
  $(".lfo4ShapeRadios").checkboxradio({
    icon: false
  });
  $('.lfo4ShapeRadios').on('click', function() {
    if ($(this).is(":checked")) {
      let classString = (($(this).attr('class')).split(' '));
      lfo4.type = (classString[1]);
    }
  });
  $('#lfo4FreqSlider').slider({
    max: 10,
    min: 0,
    step: 0.01,
    value: 0.5,
    slide: function() {
      lfo4.frequency.value = ($(this).slider('value'));
    }
  });
  $('#lfo4AmpSlider').slider({
    max: 1,
    min: 0,
    step: 0.01,
    value: 1,
    slide: function() {
      lfo4.amplitude.value = ($(this).slider('value'));
    }
  });
  // LFO Five
  $('#lfo5-onOff').checkboxradio({
    icon: false
  });
  $('#lfo5-onOff').on('click', function() {
    if ($(this).is(":checked")) {
      lfo5.start();
      lfo5.connect(delay.feedback);
    } else {
      lfo5.stop();
      lfo5.disconnect(delay.feedback);
    }
  });
  $(".lfo5ShapeRadios").checkboxradio({
    icon: false
  });
  $('.lfo5ShapeRadios').on('click', function() {
    if ($(this).is(":checked")) {
      let classString = (($(this).attr('class')).split(' '));
      lfo5.type = (classString[1]);
    }
  });
  $('#lfo5FreqSlider').slider({
    max: 10,
    min: 0,
    step: 0.01,
    value: 0.5,
    slide: function() {
      lfo5.frequency.value = ($(this).slider('value'));
    }
  });
  $('#lfo5AmpSlider').slider({
    max: 1,
    min: 0,
    step: 0.01,
    value: 1,
    slide: function() {
      lfo5.amplitude.value = ($(this).slider('value'));
    }
  });
  // LFO Six
  $('#lfo6-onOff').checkboxradio({
    icon: false
  });
  $('#lfo6-onOff').on('click', function() {
    if ($(this).is(":checked")) {
      lfo6.start();
      lfo6.connect(reverb.wet);
    } else {
      lfo6.stop();
      lfo6.disconnect(reverb.wet);
    }
  });
  $(".lfo6ShapeRadios").checkboxradio({
    icon: false
  });
  $('.lfo6ShapeRadios').on('click', function() {
    if ($(this).is(":checked")) {
      let classString = (($(this).attr('class')).split(' '));
      lfo6.type = (classString[1]);
    }
  });
  $('#lfo6FreqSlider').slider({
    max: 10,
    min: 0,
    step: 0.01,
    value: 0.5,
    slide: function() {
      lfo6.frequency.value = ($(this).slider('value'));
    }
  });
  $('#lfo6AmpSlider').slider({
    max: 1,
    min: 0,
    step: 0.01,
    value: 1,
    slide: function() {
      lfo6.amplitude.value = ($(this).slider('value'));
    }
  });
  // LFO Seven
  $('#lfo7-onOff').checkboxradio({
    icon: false
  });
  $('#lfo7-onOff').on('click', function() {
    if ($(this).is(":checked")) {
      lfo7.start();
      lfo7.connect(reverb.roomSize);
    } else {
      lfo7.stop();
      lfo7.disconnect(reverb.roomSize);
    }
  });
  $(".lfo7ShapeRadios").checkboxradio({
    icon: false
  });
  $('.lfo7ShapeRadios').on('click', function() {
    if ($(this).is(":checked")) {
      let classString = (($(this).attr('class')).split(' '));
      lfo7.type = (classString[1]);
    }
  });
  $('#lfo7FreqSlider').slider({
    max: 10,
    min: 0,
    step: 0.01,
    value: 0.5,
    slide: function() {
      lfo7.frequency.value = ($(this).slider('value'));
    }
  });
  $('#lfo7AmpSlider').slider({
    max: 1,
    min: 0,
    step: 0.01,
    value: 1,
    slide: function() {
      lfo7.amplitude.value = ($(this).slider('value'));
    }
  });
  // LFO Eight
  $('#lfo8-onOff').checkboxradio({
    icon: false
  });
  $('#lfo8-onOff').on('click', function() {
    if ($(this).is(":checked")) {
      lfo8.start();
      lfo8.connect(reverb.dampening);
    } else {
      lfo8.stop();
      lfo8.disconnect(reverb.dampening);
    }
  });
  $(".lfo8ShapeRadios").checkboxradio({
    icon: false
  });
  $('.lfo8ShapeRadios').on('click', function() {
    if ($(this).is(":checked")) {
      let classString = (($(this).attr('class')).split(' '));
      lfo8.type = (classString[1]);
    }
  });
  $('#lfo8FreqSlider').slider({
    max: 10,
    min: 0,
    step: 0.01,
    value: 0.5,
    slide: function() {
      lfo8.frequency.value = ($(this).slider('value'));
    }
  });
  $('#lfo8AmpSlider').slider({
    max: 1,
    min: 0,
    step: 0.01,
    value: 1,
    slide: function() {
      lfo8.amplitude.value = ($(this).slider('value'));
    }
  });
}