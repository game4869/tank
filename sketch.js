let cars    = [];
let carSize = 35;
let carGap  = 10;
let snowflakes = [];
let duck = 0;
let duckBody = 40;
let duckSpeed = 6;
let bg,bgE;
let end=0;
function setup() {

  createCanvas(400, 500);

  for(let i = 1; i < (height/carSize)-5; i++) {
    cars[i] = new Car(random(width),i * (carSize + carGap),random(5),color(random(255),random(255),random(255)));
  }

  duck = new Duck();
bg = loadImage('BG.jpg');
bgE = loadImage('end.jpg');
}

function draw() {
  
  if(duck.y<=40){
      background(bgE);  
      snow();
    
      end=1;
    }
  
  else {
  background(255);
  push();
   background(bg);  
   background(255,255,255,130);
  pop();
  for(let i = 1; i < (height/carSize)-5; i++) {
    cars[i].body();
    cars[i].move();
    cars[i].checkCollision();
  }
  safeZone();
  duck.body();
  duck.move();
  gun();
  block();
  }
  
  console.log(end);
}

class Car {

  constructor(x,y,speed,color){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.color = color; 
  }

  body() {
    noStroke();
    fill(this.color);
    rect(this.x,this.y,carSize,carSize);
  }

  move() {
    if(this.x > width) {
      this.x = -carSize;
    }
    this.x += this.speed;
  }

  checkCollision() {
    let d = dist(duck.x,duck.y,this.x + carSize/2,this.y + carSize/2);

    if(d < carSize/2 + duckBody/2) {
      duck.y = height - duckBody;
      duck.x = width/2;
    }
  }

}

class Duck {

  constructor() {
    this.x = width/2;
    this.y = height - duckBody;
  }

  body() {
    fill(0,255,0);
    ellipse(this.x,this.y+15,duckBody,duckBody);
  }

  move() {
    if(end==0){
    if(keyIsDown(LEFT_ARROW)) {
      this.x -= duckSpeed;
    }
    if(keyIsDown(RIGHT_ARROW)) {
      this.x += duckSpeed;
    }
    if(keyIsDown(UP_ARROW)) {
      this.y -= duckSpeed;
    }
    if(keyIsDown(DOWN_ARROW)) {
      this.y += duckSpeed;
    }
  }
  }
  
}

function safeZone(){
  noStroke();
  fill(0);
  beginShape();
  vertex(0,450);
  vertex(0,500);
  vertex(400,500);
  vertex(400,450);
  endShape(CLOSE);
  
  fill(255, 0, 0);
  rect(0,0,800,40);
  fill(255, 255, 255);
  rect(30,0,40,40);
  fill(255, 255, 255);
  rect(110,0,40,40);
  fill(255, 255, 255);
  rect(190,0,40,40);
  fill(255, 255, 255);
  rect(270,0,40,40);
  fill(255, 255, 255);
  rect(350,0,40,40);

}

function gun(){
  

  
  fill(0);
  rect(-40, 43,100, 40);
  rect(-40, 88,100, 40);
  fill(170);
  ellipse(-30,85,100,100);
  fill(0);
  rect(-45, 133,100, 40);
  rect(-45, 178,100, 40);
  fill(170);
  ellipse(-35,175,100,100);
  fill(0);
  rect(-50, 223,100, 40);
  rect(-50, 268,100, 40);
  fill(170);
  ellipse(-40,265,100,100);
  fill(0);
  rect(-55, 313,100, 40);
  rect(-55, 358,100, 40);
  fill(170);
  ellipse(-45,355,100,100);
  fill(0);
  rect(-60, 403,100, 40);
  
  }

function block(){
  
    if((duck.y >= height)||(duck.y == 0)){
      duck.y = height - duckBody;
      duck.x = width/2;
    }
    else if((duck.x >= width)||(duck.x == 0)){
      duck.y = height - duckBody;
      duck.x = width/2;
    }
    
}


function snow() {
  fill(210,210,210);
  strokeWeight(1);
      let t = frameCount / 60; // update time

  // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
}

function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}

function keyTyped(){
  if ((key === 'R')||(key === 'r')) {
    end = 2;
    
  }
}