let numbers = [];
let count = 1;
let sequence = [];
let index = 0;

var attractors = [];
var particles = [];

let gif;
let canvas;
let framesToSkip = 8;
let makeGif = true;
let isGifExported = false;

function setupGif() {
  recordedFrames = 3;

  gif = new GIF({
    workers: 2,
    quality: 100,
    workerScript: "gif.worker.js"
  });

  const uuid = parseInt(Math.random() * 10000000);
  gif.on("finished", function (blob) {
    print("GIT: finished");
    rendering = false;
    window.open(URL.createObjectURL(blob));
    saveAs(blob, `bezier-${uuid}@2x.gif`);
    setupGif();
    recordedFrames = 0;
  });
}

function setup() {
  canvas = createCanvas(2000, 2000);
  setAttributes("antialias", true);
  setupGif();

  // angleMode(DEGREES);
  background(15, 16, 32);
  // background(7)
  numbers[index] = true;
  sequence.push(index);
  let a = 0.0;
  let inc = 360 / 25.0;
  let ang = 0;
  ////////////////////////////////////////////////////
  // attractors are created in the given location - numbers are created
  // 3000 weird pattern
  for (var m = 1; m < 3000; m++) {
    seq();
  }
  for (var i = 0; i < sequence.length; i++) {
    let x = sequence[i] * cos(ang) + width / 2;
    let y = sequence[i] * sin(ang) + height / 2;
    xx = x;
    yy = y;
    attractors.push(createVector(x, y));
    ang = ang + 0.012;
    // print(sequence[i]);
  }

  ////////////////////////////////////////////////////////////////
  //////////// where the free particles are and how many of them you want ///////////

  //   // #1
  //   for (let i = 0; i < 30; i++) {
  //     particles.push(new Particle(500, 500, "#F05D23", 20))
  //   }
  //   //#2
  //   for (let i = 0; i < 30; i++) {
  //     particles.push(new Particle(1000, 500, "#52FFB8", 20))
  //   }
  //   //#3
  //   for (let i = 0; i < 30; i++) {
  //     particles.push(new Particle(1500, 500, "#AF42AE", 20))
  //   }
  //   //#4
  //   for (let i = 0; i < 30; i++) {
  //     particles.push(new Particle(500, 1000, "#FFFC31", 20))
  //   }
  //   //#5
  //   // for (let i = 0; i < 50; i++) {
  //   //   particles.push(new Particle(1000, 1000, "#FFE9DA", 20))
  //   // }
  // // #6
  //   for (let i = 0; i < 30; i++) {
  //     particles.push(new Particle(1500, 1000, "#00E8FC", 20))
  //   }
  //   //#7
  //   for (let i = 0; i < 30; i++) {
  //     particles.push(new Particle(500, 1500, "#D7263D", 20))
  //   }
  //   //#8
  //   for (let i = 0; i < 30; i++) {
  //     particles.push(new Particle(1000, 1500, "#15616D", 20))
  //   }

  //   //////#111111111/////////////////////////////////////////////////
  // #1
  for (let i = 0; i < 30; i++) {
    particles.push(new Particle(500, 500, "#EC7D10", 20));
  }
  //#2
  for (let i = 0; i < 30; i++) {
    particles.push(new Particle(1000, 500, "#D704B2", 20));
  }
  //#3
  for (let i = 0; i < 30; i++) {
    particles.push(new Particle(1500, 500, "#C200FB", 20));
  }
  //#4
  for (let i = 0; i < 30; i++) {
    particles.push(new Particle(500, 1000, "#FC2F00", 20));
  }
  //#5
  // for (let i = 0; i < 50; i++) {
  //   particles.push(new Particle(1000, 1000, "#FFE9DA", 20))
  // }
  // #6
  for (let i = 0; i < 30; i++) {
    particles.push(new Particle(1500, 1000, "#FFBC0A", 20));
  }
  //#7
  for (let i = 0; i < 30; i++) {
    particles.push(new Particle(500, 1500, "#EC0868", 20));
  }
  //#8
  for (let i = 0; i < 30; i++) {
    particles.push(new Particle(1000, 1500, "#F45608", 20));
  }
}

function draw() {
  /////////////////////////////////////////////////////
  ///attractors being SHOWED with a point at x , y
  stroke(255);
  strokeWeight(1);
  // for (var i = 0; i < attractors.length; i++) {
  //   point(attractors[i].x, attractors[i].y);
  // }
  // ///////////////////////////////////////////////////

  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    for (var j = 0; j < attractors.length; j++) {
      particle.attracted(attractors[j]);
    }
    particle.update();
    particle.show();
  }
  // let FC = frameCount
  // print(FC)
  // print(mouseX , mouseY)

  if (
    makeGif &&
    !isGifExported &&
    ((frameCount - 1) % framesToSkip == 0 || frameCount == 1)
  ) {
    console.log(`Added frame.`);
    gif.addFrame(canvas.elt, { delay: 30, copy: true });
  }

  // GIF: Render when done
  if (
    makeGif &&
    !isGifExported &&
    // replace with condition to render
    frameCount > 960
  ) {
    print("Exporting GIF...");
    gif.render();
    isGifExported = true;
  }
}

function seq() {
  let next = index - count;
  if (next < 0 || numbers[next]) {
    next = index + count;
  }
  numbers[next] = true;
  sequence.push(next);
  index = next;
  count++;
  // print(sequence)
}
