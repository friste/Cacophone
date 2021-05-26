let xp, yp;

///////////////////////////////////////
class Voice {
  constructor(frequency, shape) {
    this.synth = new p5.Oscillator();
    this.adsr = new p5.Envelope();
    
    this.synth.setType(shape)
    this.synth.freq(frequency);
    this.synth.start();
    this.synth.amp(this.adsr);
    
    var rev1 = new p5.Reverb();
    var lp1 = new p5.LowPass();
    lp1.freq(400);
    this.synth.disconnect();
    this.synth.connect(rev1);
    rev1.disconnect();
    rev1.connect(lp1);
    // rev1.process(this.synth, 6, 2);
  }
  
  setFreq(f) {
    this.synth.freq(f);
  }
  
  sound() {
    this.adsr.play();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  
  v1 = new Voice(200, 'sine');
  v2 = new Voice(400, 'sawtooth');
  v3 = new Voice(100, 'sawtooth');
  frameRate(100);

  webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
     xp = data.x;
     yp = data.y;

    //elapsed time is based on time since begin was called
  }).begin();
}

function draw() {
  // if (mouseIsPressed) {
  var round = Math.floor(xp);
    freq1 = constrain(map(round, 0, width, 50, 700), 50,       700);
    // freq2 = constrain(map(round, 0, width, 100, 400), 100,       400);
    // freq3 = constrain(map(round, 0, width, 200, 400), 200,       400);
    v1.setFreq(freq1);
    v1.sound();
    // v2.setFreq(freq2);
    // v2.sound();
    // v2.setFreq(freq3);
    // v3.sound();
  // }
}
///////////////////////////////////////
