var PLAY = 1;
var END = 0;
var gameState = PLAY;

var spaceship, spaceshipImage;
var bg, bgImage;

var alien, alienImage;

var score;

var bullet, bulletImage;

function preload(){
  bgImage = loadImage("bg.png");
  spaceshipImage = loadImage("spaceship.png");
  alienImage = loadImage("alien.png");
  bulletImage = loadImage("bullet.png");
  
}

function setup() {
  createCanvas(700,450)
  
  
  bg = createSprite(350,220,700,450);
  bg.addImage(bgImage);
  bg.scale = 0.5;

  spaceship = createSprite(80,240,50,50);
  spaceship.addImage(spaceshipImage);
  spaceship.scale = 0.2

  spaceship.setCollider("rectangle",0,0,spaceship.width,spaceship.height);
  spaceship.debug = true

  aliensGroup = new Group();

  score = 0;
  
}

function draw() {
  
  background(180);


  text("Score: "+ score, 500,50);
  
  

  if(gameState === PLAY){
    
    spaceship.y = World.mouseY
    bg.velocityX = -4;

    bg.velocityX = -(4 + 3* score/100)
    score = score + Math.round(getFrameRate()/60);

    spawnAliens();
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (bg.x < 0){
     bg.x = ground.width/2;
    }

    if (keyDown("space")) {
      bullet = createSprite(70, 195, 1, 1);
      bullet.velocityX = 20;
      bullet.x = gun.x;
      bullet.y = gun.y+5;
      }

    if (aliensGroup.isTouching(bullet)) {
        alien.velocityX = 0;
        
      } 

    if (aliensGroup.isTouching(spaceship)) {
      gameState == "END";
    }

  }
   else if (gameState === END) {
      bg.velocityX = 0;

      
   }
  
    
  
  drawSprites();
}


function spawnAliens() {
  if (frameCount % 60 === 0) {
  alien = createSprite(700,220,50,50);
  alien.y=Math.round(random(100,400));
  alien.addImage(alienImage);
  alien.scale = 0.2
  alien.velocityX = -(6 + score/100);
  aliensGroup.add(alien);

}
}
