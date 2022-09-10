var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg, ghostJumpImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  ghostJumpImg = loadImage("ghost-jumping.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200);
  ghost.addImage("standing",ghostImg);
  ghost.addImage("jumping",ghostJumpImg);
  ghost.changeImage("standing")
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  
  if(tower.y > 400){
      tower.y = 300
  }

  if(keyDown("SPACE")){
    ghost.velocityY = -10
    ghost.changeImage("jumping");
  }
  ghost.changeImage("standing");
  ghost.velocityY += 0.5;

  if(keyDown("right")){
    ghost.x += 3
  }
  if(keyDown("left")){
    ghost.x += -3
  }

  if(frameCount%200 == 0){
    spawnDoors();
  }

  if(ghost.isTouching(invisibleBlockGroup) || ghost.y > 600){
    ghost.destroy();
  }
  if(ghost.isTouching(climbersGroup)){
    ghost.velocityY = 0
  }

  drawSprites();
}
function spawnDoors(){
  door = createSprite(random(120,400),-50)
  door.addImage(doorImg);
  door.velocityY = 1;
  door.lifetime = 800;
  ghost.depth = door.depth + 1;
  doorsGroup.add(door);

  climber = createSprite(door.x,12);
  climber.addImage(climberImg);
  climber.velocityY = 1;
  climber.lifetime = 800;
  climbersGroup.add(climber);

  invisibleBlock = createSprite(climber.x,15,climber.width,2);
  invisibleBlock.visible = false;
  invisibleBlock.velocityY = 1;
  invisibleBlock.lifetime = 800;
  invisibleBlockGroup.add(invisibleBlock);
}