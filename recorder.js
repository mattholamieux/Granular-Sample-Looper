function audioRecorder() {
  const $audio = document.querySelector('#myAudio');
  $($audio).hide();
  const actx = Tone.context;
  recDest = actx.createMediaStreamDestination();
  recorder = new MediaRecorder(recDest.stream);
  let chunks = [];
  recorder.onstart = evt => {
    chunks = [];
  };
  recorder.ondataavailable = evt => {
    chunks.push(evt.data);
  };
  recorder.onstop = evt => {
    let blob = new Blob(chunks, {
      type: 'audio/ogg; codes=opus'
    });
    $audio.src = URL.createObjectURL(blob);
    $($audio).show();
  };
}