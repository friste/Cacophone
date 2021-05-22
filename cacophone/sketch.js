
let paintCanvas;
let r, g, b;

let adsr, carrier, carFreq, modulator, modFreq, modDepth, shape;
var waveShapes = ["sawtooth", "sine", "square", "triangle"];

let waveShapeSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  paintCanvas = createGraphics(windowWidth, windowHeight);
  paintCanvas.clear();

  waveShapeSlider = createSlider(0, 3, 0, 1);

  adsr = new p5.Envelope();
  adsr.setADSR(1, 0.01, 0.01, 6);
  adsr.setRange(0.09, 0);

  carrier = new p5.Oscillator();
  carrier.amp(adsr);

  modulator = new p5.Oscillator();
  modulator.setType("square");
  modulator.start();
  modulator.disconnect();

  frameRate(100);
}

function draw() {
  shape = waveShapeSlider.value();
  carrier.setType(waveShapes[shape]);
  r = map(mouseX, 0, windowWidth, 190, 240);
  g = map(mouseY, 0, windowHeight, 200, 255);
  b = map(mouseX, 0, windowWidth, 210, 240);
  background(r, g, b);
  image(paintCanvas, 0, 0);
  if (mouseIsPressed) {
    play();
    brush();
  }
}

function brush() {
  paintCanvas.fill(r, g, b);
  paintCanvas.noStroke();
  paintCanvas.ellipse(mouseX, mouseY, 700, 700);
}

function play() {
  carrier.freq(modulator);
  carrier.start();
  adsr.play();
  modDepth = map(mouseY, 0, windowHeight, -150, 150);
  modulator.amp(modDepth);
  modFreq = map(mouseX, 0, windowWidth, 0.2, 90);
  modulator.freq(modFreq);
}
