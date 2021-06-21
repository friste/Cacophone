let xp, yp, toggle;
let DRAG, TAP, GAZE, val;
DRAG = 1;
TAP = 2;
GAZE = 3;


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
  }
  
  setFreq(f) {
    this.synth.freq(f);
  }
  
  sound() {
    this.adsr.play();
  }
}


class Ambience {
  constructor() {
    
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  
  toggle = createSlider(1, 3, 1);
  
  v1 = new Voice(200, 'triangle');
  v2 = new Voice(300, 'sine');
  v3 = new Voice(100, 'triangle');
  frameRate(100);
  
}

function draw() {
  
  val = toggle.value();
  
  if (val == 1) {
    drag();
  }
  else if (val == 2) {
    tap();
  }
  else {
    gaze();
  }
  
  r = map(mouseX, 0, windowWidth, 10, 20);
  g = map(mouseY, 0, windowHeight, 1, 30);
  b = map(mouseX, 0, windowWidth, 1, 30);
  background(r, g, b);
  
}

function drag() {
  if (mouseIsPressed) {
    freq1 = constrain(map(mouseX, 0, width, 50, 700), 50, 700);
    v1.setFreq(freq1);
    v1.sound();
  }
}

function tap() {
  
}

function gaze() {
  webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
     xp = data.x;
     yp = data.y;

  }).begin();
}

/////////////
