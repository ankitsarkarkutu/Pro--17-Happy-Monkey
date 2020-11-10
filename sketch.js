var PLAY = 1;
var END = 2;
var gameState =1;

var monkey,running;
var banana ,bananai, obstacle, obstaclei;
var FoodGroup, obstacleGroup,cloudsGroup;
var score,food,foodi,food1;
var ground,iground,groundi,cloudsi,restarti,gameoveri;
var restart,gameover;

function preload(){
  
  monkey1 = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananai = loadImage("banana.png");
  obstaclei = loadImage("obstacle.png"); 
  monkey2 = loadAnimation("trapped.png");
  groundi = loadImage("ground.png");
  cloudsi = loadImage("cloudsi.png");
  restarti = loadImage("restart.png");
  gameoveri = loadImage("gameover.png");
  foodi = loadImage("monkeyfood.png");
  
}

function setup() {
  
createCanvas(650, 650);
  
 monkey = createSprite(120,550,40,40);
 monkey.addAnimation("running",monkey1);
 monkey.addAnimation("collided",monkey2);
 monkey.scale = 0.2;

  ground = createSprite(100,633,10,10);
  ground.x = ground.width/2;
  ground.addImage(groundi);
  ground.velocityX = -5;
  
   iground = createSprite(300,614,1000,5);
   iground.visible = false;
  
    food1 = createSprite(30,30,10,10);
    food1.addImage(foodi)
    food1.scale = 0.1
  
obstacleGroup = createGroup();
FoodGroup = createGroup();
cloudsGroup = createGroup(); 

  score = 0;
  food = 0;
  
}

function draw() {
  
background("lightblue");
  
  textSize(20)
  fill("white");
 text("SURVIVAL SCORE : "+ score, 235,40);
  fill("black")
  textSize(25)
text(" = "+ food, 55,40);

  
  if(gameState === PLAY){
    
   monkey.setCollider("rectangle",0,0,380,610)
   score = Math.ceil(frameCount/frameRate());
      ground.velocityX = -5;
  
    if(keyDown("space")&& monkey.y >= 420) {
        monkey.velocityY = -20 ;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8 + 0.1/2;
    
    Spawnobstacle();
    spawnClouds();
    spawnFood();
    
    if (ground.x<0){
      ground.x = ground.width/2;
    }
    if (FoodGroup.isTouching(monkey)){
      food = food + 1
      FoodGroup.destroyEach();
    }
    if(obstacleGroup.isTouching(monkey)){
    restart = createSprite(325,325,10,10);
    restart.addImage(restarti);
    restart.scale = 0.7;
    gameover = createSprite(325,430,20,20);
    gameover.addImage(gameoveri);
    gameover.scale = 0.4     
    cloud.velocityX = -0;      
    banana.velocityX = -0;
    gameState = END; 

    }
  
  }
   else if (gameState === END) {
    monkey.setCollider("rectangle",0,0,400,535)
    monkey.changeAnimation("collided", monkey2);
    monkey.scale = 0.2 + 0.1/3;
    monkey.y = 585;
    ground.velocityX = 0;
    monkey.velocityY = 0  
    obstacleGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    var t = text("CLICK HERE TO RESTART THE GAME  ", 100,255);
    t.depth = banana.depth;
    t.depth = banana.depth + 1;
       
    if (mousePressedOver(restart)){
    reset();
    restart.visible = false;
    gameover.visible = false;
    monkey.scale = 0.2;

  }
   }
  monkey.collide(iground);
  drawSprites();
}
function Spawnobstacle(){
  if (frameCount % 300 === 0){
  obstacle = createSprite(650,557,50,50);
  obstacle.addImage(obstaclei);
  obstacle.scale = 0.2 + 0.2/3;
  obstacle.velocityX = -5 ;
  obstacle.lifetime = 150; 
  obstacle.setCollider("rectangle",-90,0,280,280);
  obstacleGroup.add(obstacle);
 }
}
function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
  FoodGroup.destroyEach();
  score = 0;
  food = 0;
  monkey.changeAnimation("running", monkey1);
}
function spawnClouds() {
  if (frameCount % 200 === 0) {
    cloud = createSprite(600,150,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudsi);
    cloud.scale = 0.5;
    cloud.velocityX = -5;
    cloud.lifetime = 200;
    cloud.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    cloudsGroup.add(cloud);
  }
}
function spawnFood() {
  if (frameCount % 100 === 0) {
    banana = createSprite(600,540,40,10);
    banana.y = random(190,230,290);    
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    banana.addImage(bananai);
    banana.scale=0.1;
    FoodGroup.add(banana);
  }
}


