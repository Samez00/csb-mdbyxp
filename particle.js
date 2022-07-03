function Particle(x, y , Strk , alpha ) {
  // here we have a particle with this position at x,y
  this.pos = createVector(x, y);
  this.prev = createVector(x, y);
  // this.vel = createVector();
  this.vel = p5.Vector.random2D();
  //variable velocity
  ///some are stronger 
  // this.vel.setMag(random(2,50))
  this.acc = createVector();
  this.strk = Strk ;
  this.alpha = alpha;
  
  this.update = function () {
    this.vel.add(this.acc);
    this.vel.limit(250);
    this.pos.add(this.vel);
    this.acc.mult(0);
    if (this.pos.x > 1999 || this.pos.y > 1999 || this.pos.x < 1 ||this.pos.y<1 ){
      this.vel.mult(-1)
    }
   
  };
  this.show = function () {
    clr = color(this.strk);
    clr.setAlpha(this.alpha);
    stroke(clr);

  
      // this.strk.setAlpha(25);
      // stroke(this.strk)
      // stroke(82, 255, 184, 225)

    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);

    this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;
    
  };

  this.attracted = function (target) {
    //var dir = target - this.pos
    var force = p5.Vector.sub(target, this.pos);
    var dsquared = force.magSq();
    dsquared = constrain(dsquared, 6.67,467);

    var G = 6.67430;
    var strength = (G) / dsquared;
    force.setMag(strength);
    // force.mult(-1)
    // if(dsquared<150){
    //   force.mult(-1)
    // }
    this.acc.add(force);
  };
}
