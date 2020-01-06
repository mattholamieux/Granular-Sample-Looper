function loadPlayer() {
  const buffer = new Tone.Buffer("loops/loop0.wav", function() {
    let buff = buffer.get();
    player = new Tone.GrainPlayer(buff);
    player.loop = true;
    player.chain(filter, delay, reverb)
    guiControls();
  });
}