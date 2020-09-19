var tower,towerImage;
var ghost,ghostImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var invisibleblock,invisibleblockGroup;
var gameState = "play";

function preload(){
  towerImage = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
}


function setup(){
createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=1;
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
  climberGroup = new Group();
  invisibleblockGroup = new Group();
}


function draw(){
  background("black");
  if(gameState==="play"){
  
  if (tower.y>400){
    tower.y = 300;
    
  }
  if (keyDown("space")){
    ghost.velocityY = -10;
  }
  ghost.velocityY = ghost.velocityY +0.8;
  if (keyDown("left_arrow")){
    ghost.x = ghost.x -3;
  }
  if (keyDown("right_arrow")){
    ghost.x = ghost.x +3;
  }
              
 spawnDoors();
  if(ghost.isTouching(climberGroup)){
    ghost.velocityY = 0;
  }
  if(invisibleblockGroup.isTouching(ghost)|| ghost.y>600){
    ghost.destroy();
    gameState = "end";
  }
  drawSprites();
  }
if (gameState==="end"){
  text("Game Over",150,250);
}
}

function spawnDoors(){
  if(frameCount %240 === 0){
    door = createSprite(200,-50);
    door.addImage(doorImage);
    door.velocityY = 1;
    door.x = Math.round(random(120,400));
    ghost.depth = door.depth;
    ghost.depth = ghost.depth +1;
    
    climber = createSprite(200,10);
    climber.addImage(climberImage);
    climber.x = door.x;
    climber.velocityY = 1;
    climberGroup.add(climber);
    
    invisibleblock = createSprite(200,15);
    invisibleblock.width = climber.width;
    invisibleblock.x = door.x;
    invisibleblock.height = 2;
    invisibleblock.y = 1;
    invisibleblockGroup.add(invisibleblock);
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleblock.lifetime = 800;
  }
}