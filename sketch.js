var monkey, monkeyrunning;
var banana, bananaimg, obstacle, obstacleimg;
var foodgroup, obstaclegroup;
var score = 0;

function preload(){
  monkeyrunning = loadAnimation("monkey_0.png","monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png");
  bananaimg= loadImage ("banana.png");
  obstacleimg= loadImage("obstacle.png");
}

function setup (){
  var survivaltime= 0;
 
  monkey= createSprite (80,315,20,20);
  monkey.addAnimation("running", monkeyrunning);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x= ground.width/2;
  
  foodgroup= new Group();
  obstaclegroup= new Group();
  }
function spawnfood(){
  if(frameCount % 80===0){
      banana=createSprite(600,250,40,10);
      banana.y= random(120,200);
      banana.velocityX= -5;
      banana.lifetime= 300;
      monkey.depth= banana.depth+1;
      banana.addImage(bananaimg);
      banana.scale=0.05;
      foodgroup.add(banana);
  }
  
}
function spawnobstacles(){
if (frameCount % 300===0){
  obstacle= createSprite(800,320,10,40);
  obstacle.velocityX=-6;
  obstacle.addImage (obstacleimg);
  obstacle.scale=0.15;
  obstacle.lifetime=300;
  obstaclegroup.add(obstacle);
}
  
}
function draw(){
  background("white");
  if(ground.x>0){
    ground.x=ground.width/2;
  }
  if(keyDown("space")){
    monkey.velocityY= -12;
  }
  monkey.velocityY= monkey.velocityY+0.8;
  monkey.collide(ground);
  
  spawnfood();
  spawnobstacles();
  drawSprites();
  text("score:", score, 500,50);
  
  if (obstaclegroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    obstaclegroup.setVelocityXEach(0);
    foodgroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-1);
    foodgroup.setLifetimeEach(-1);
  }
}

