//console.log(stuff)
// if you are not using a varibale just get rid of it.
// put your logic somewhere else than ui
// link diffrent js files to your html


let player;
let samp;
let reverb, delay, chorus, compressor, filter, pitchShift;
let lfo1;
let dropzone;
let sound;
let sampDuration;

function preload() {
    samp = loadSound('loops/loop0.wav');
}

function setup() {
    dropzone = select('#dropZone');
    initFX();
    initLFO();
    dropzone.drop(gotFile);
    sampDuration = samp.buffer.duration;
    player = new Player();
    player.loadSamp(samp.url);
    player.player.chain(pitchShift, filter, delay, reverb);
    // initLFO();

    $("#tabs").tabs();
    $("#accordian").accordion();

    // Sample Sliders
    $('#rangeSlider').slider({
        range: true,
        min: 0,
        max: sampDuration,
        step: 0.01,
        values: [0, sampDuration],
        slide: function() {
            player.player.loopStart = ($(this).slider('values', 0));
            player.player.loopEnd = ($(this).slider('values', 1));
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

    // FILTER sliders
    $(".filterTypeRadios").checkboxradio({
        icon: false
    });
    $('.filterTypeRadios').on('click', function() {
        if ($(this).is(":checked")) {
            filter.type = ($(this).attr('id'));
        }
    });

    $('#filterFreqSlider').slider({
        max: 6000,
        min: 0,
        step: 0.01,
        value: 5000,
        slide: function() {
            filter.frequency.value = ($(this).slider('value'));
            $('#filterFreqAmount').val($(this).slider('value'));
        }
    });
    $('#filterQSlider').slider({
        max: 20,
        min: 0,
        step: 0.01,
        value: 1,
        slide: function() {
            console.log(filter.Q.value);
            filter.Q.value = ($(this).slider('value'));
            $('#filterQAmount').val($(this).slider('value'));
        }
    });
    // DELAY Sliders
    $('#delayWetSlider').slider({
        max: 1,
        min: 0,
        step: 0.01,
        value: 0,
        slide: function() {
            delay.wet.value = ($(this).slider('value'));
            $('#delayWetAmount').val($(this).slider('value'));
        }
    });
    $('#delayTimeSlider').slider({
        max: 1,
        min: 0,
        step: 0.01,
        value: 0,
        slide: function() {
            delay.delayTime.value = ($(this).slider('value'));
            $('#delayTimeAmount').val($(this).slider('value'));
        }
    });
    $('#delayFeedbackSlider').slider({
        max: 1,
        min: 0,
        step: 0.01,
        value: 0,
        slide: function() {
            delay.feedback.value = ($(this).slider('value'));
            $('#delayFeedbackAmount').val($(this).slider('value'));
        }
    });

    //REVERB sliders
    $('#reverbWetSlider').slider({
        max: 1,
        min: 0,
        step: 0.01,
        value: 0,
        slide: function() {
            reverb.wet.value = ($(this).slider('value'));
            $('#reverbWetAmount').val($(this).slider('value'));
        }
    });
    $('#reverbTimeSlider').slider({
        max: 1,
        min: 0,
        step: 0.01,
        value: 0,
        slide: function() {
            reverb.roomSize.value = ($(this).slider('value'));
            $('#reverbTimeAmount').val($(this).slider('value'));
        }
    });
    $('#reverbDampSlider').slider({
        max: 6000,
        min: 0,
        step: 0.01,
        value: 0,
        slide: function() {
            reverb.dampening.value = ($(this).slider('value'));
            $('#reverbDampAmount').val($(this).slider('value'));
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
            $('#lfo1FreqAmount').val($(this).slider('value'));
        }
    });
    $('#lfo1AmpSlider').slider({
        max: 1,
        min: 0,
        step: 0.01,
        value: 1,
        slide: function() {
            lfo1.amplitude.value = ($(this).slider('value'));
            $('#lfo1AmpAmount').val($(this).slider('value'));
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
            $('#lfo2FreqAmount').val($(this).slider('value'));
        }
    });
    $('#lfo2AmpSlider').slider({
        max: 1,
        min: 0,
        step: 0.01,
        value: 1,
        slide: function() {
            lfo2.amplitude.value = ($(this).slider('value'));
            $('#lfo2AmpAmount').val($(this).slider('value'));
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
            $('#lfo3FreqAmount').val($(this).slider('value'));
        }
    });
    $('#lfo3AmpSlider').slider({
        max: 1,
        min: 0,
        step: 0.01,
        value: 1,
        slide: function() {
            lfo3.amplitude.value = ($(this).slider('value'));
            $('#lfo3AmpAmount').val($(this).slider('value'));
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
            $('#lfo4FreqAmount').val($(this).slider('value'));
        }
    });
    $('#lfo4AmpSlider').slider({
        max: 1,
        min: 0,
        step: 0.01,
        value: 1,
        slide: function() {
            lfo4.amplitude.value = ($(this).slider('value'));
            $('#lfo4AmpAmount').val($(this).slider('value'));
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
            $('#lfo5FreqAmount').val($(this).slider('value'));
        }
    });
    $('#lfo5AmpSlider').slider({
        max: 1,
        min: 0,
        step: 0.01,
        value: 1,
        slide: function() {
            lfo5.amplitude.value = ($(this).slider('value'));
            $('#lfo5AmpAmount').val($(this).slider('value'));
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
            $('#lfo6FreqAmount').val($(this).slider('value'));
        }
    });
    $('#lfo6AmpSlider').slider({
        max: 1,
        min: 0,
        step: 0.01,
        value: 1,
        slide: function() {
            lfo6.amplitude.value = ($(this).slider('value'));
            $('#lfo6AmpAmount').val($(this).slider('value'));
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
            $('#lfo7FreqAmount').val($(this).slider('value'));
        }
    });
    $('#lfo7AmpSlider').slider({
        max: 1,
        min: 0,
        step: 0.01,
        value: 1,
        slide: function() {
            lfo7.amplitude.value = ($(this).slider('value'));
            $('#lfo7AmpAmount').val($(this).slider('value'));
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
            $('#lfo8FreqAmount').val($(this).slider('value'));
        }
    });
    $('#lfo8AmpSlider').slider({
        max: 1,
        min: 0,
        step: 0.01,
        value: 1,
        slide: function() {
            lfo8.amplitude.value = ($(this).slider('value'));
            $('#lfo8AmpAmount').val($(this).slider('value'));
        }
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
    filter = new Tone.Filter().connect(compressor);
    pitchShift = new Tone.PitchShift().connect(compressor);
    filter.frequency.value = 6000;
    filter.type = "lowpass";
    filter.q = 1;
    delay.wet.value = 0;
    delay.delayTime.value = 0.125;
    delay.feedback.value = 0.125;
    reverb.wet.value = 0;
    reverb.roomSize.value = 0.5;
    reverb.dampening.value = 3000;
    pitchShift.windowSize = 1.2;
    pitchShift.pitch = 12;
    pitchShift.delayTime.value = 1;
    pitchShift.feedback.value = 0.5;
    pitchShift.wet.value = 1;
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