window.onload = function() {
  var keys = document.querySelectorAll('.keys > li');
  for (key in keys) {
    keys[key].onclick = notePressHandler;
  }
}


function notePressHandler(e) {
  console.log(e.target.id);
  piano.playNote(e.target.id);
}


var Piano = function() {

  if ( navigator.userAgent.match(/iPhone|iPad|iPod/i) ) {
    var audioContext = new window.webkitAudioContext();
  } else {
    var audioContext = new window.AudioContext();
  }
  oscillator = audioContext.createOscillator();
  var gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  var real = new Float32Array([0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1]);
  var imag = new Float32Array(real.length);



  var wave = audioContext.createPeriodicWave(real, imag);
  oscillator.setPeriodicWave(wave);

  oscillator.frequency.value = 0;
  oscillator.start();

  var notes = {
    "c1": 0,
    "cis1": 1,
    "d1": 2,
    "dis1": 3,
    "e1": 4,
    "f1": 5,
    "fis1": 6,
    "g1": 7,
    "gis1": 8,
    "a1": 9,
    "ais1": 10,
    "b1": 11,
    "c2": 12,
    "cis2": 13,
    "d2": 14,
    "dis2": 15,
    "e2": 16,
    "f2": 17,
    "fis2": 18,
    "g2": 19,
    "gis2": 20,
    "a2": 21,
    "ais2": 22,
    "b2": 23,
    "c3": 24,
    "cis3": 25,
    "d3": 26,
    "dis3": 27,
    "e3": 28,
    "f3": 29,
    "fis3": 30,
    "g3": 31,
    "gis3": 32,
    "a3": 33,
    "ais3": 34,
    "b3": 35
  };
  var keyNotes = [
    81,
    50,
    87,
    51,
    69,
    82,
    53,
    84,
    54,
    89,
    85,
    56,
    73,
    57,
    79,
    80,
    189,
    219,
    187,
    221,
    65,
    90,
    88,
    68,
    67,
    70,
    86,
    66,
    72,
    78,
    74,
    77,
    75,
    188,
    190,
    186,
    191
  ]

  var timer;
  function fade(speed) {
    timer = setInterval(() => {
      if (gainNode.gain.value > 0) {
        gainNode.gain.value -= 0.15;
        console.log(gainNode.gain.value);
      } else {
        gainNode.gain.value = 0;
        clearInterval(timer);
      }
    }, 70);
  }
  this.playNoteFromKey = function(keyCode) {
    clearInterval(timer);
    oscillator.frequency.value = 220 * Math.pow(2, keyNotes.indexOf(keyCode) / 12);
    gainNode.gain.value = 1;
    fade();
  };

  this.playNote = function(note) {
    clearInterval(timer);
    oscillator.frequency.value = 220 * Math.pow(2, notes[note]/12);
    gainNode.gain.value = 1;
    fade();
  };
}
window.onkeyup = function(e) {
  piano.playNoteFromKey(e.keyCode);
}
var piano = new Piano();
