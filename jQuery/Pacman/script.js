var world = [
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,1,1,2,2,1,2,2,2,2,2,2,2,1,1,2,2],
  [2,1,2,1,1,1,2,2,1,2,2,2,1,1,1,1,1,1,1,2],
  [2,1,2,1,2,2,2,2,1,2,2,2,1,2,2,2,2,2,1,2],
  [2,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,2,1,2],
  [2,1,2,1,2,2,2,2,2,2,2,1,2,2,2,2,1,2,1,2],
  [2,1,2,1,2,2,2,2,2,2,2,1,2,1,1,2,1,2,1,2],
  [2,1,1,1,2,2,2,1,1,1,1,1,2,2,1,1,1,1,1,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

var score = 0;
var total_coin_cherry = 0;
var collected_coin_cherry = 0;
var cherryChance = 5;

var pacman = {
  x: 1,
  y: 1,
  angle: 0,
  name: "pacman",
  lives: 1
};

var orange_ghost = {
  x: 18,
  y: 8,
  angle: 0,
  name: "orange-ghost"
};

var blue_ghost = {
  x: 10,
  y: 8,
  angle: 0,
  name: "blue-ghost"
};

function displayWorld(){
  var output = "";

  for (var i = 0; i < world.length; i++){
    output += "<div class='row'>";
    for (var j = 0; j < world[i].length; j++){
      switch (world[i][j]) {
        case 2:
        output += "<div class='brick'></div>"
        break;
        case 1:
        output += "<div class='coin'></div>"
        break;
        case 3:
        output += "<div class='cherry'></div>"
        break;
        default:
        output += "<div class='empty'></div>"
      }
    }
    output += "</div>";
  }
  document.getElementById("world").innerHTML = output;
}

// function displayPacman(){
//   document.getElementById("pacman").style.top = pacman.y*20+"px";
//   document.getElementById("pacman").style.left = pacman.x*20+"px";
//   document.getElementById("pacman").style.transform = "rotate("+pacman.angle+"deg)";
// }

function displayUnit(unit){
  document.getElementById(unit.name).style.top = unit.y*20+"px";
  document.getElementById(unit.name).style.left = unit.x*20+"px";
  document.getElementById(unit.name).style.transform = "rotate("+unit.angle+"deg)";
}

function displayAllUnits(){
  displayUnit(pacman);
  displayUnit(orange_ghost);
  displayUnit(blue_ghost);
}

function displayScore(){
  document.getElementById("score").innerHTML = score + "pts";
}

function displayLives(){
  document.getElementById("lives").innerHTML = pacman.lives + "hp";
}

function initWorld(){

  iterateThroughWorld(setToCherry);

  for (row in world){
    for (column in world[row]){
      if (world[row][column] == 1 || world[row][column] == 3){
        total_coin_cherry++;
      }
    }
  }

  displayAllUnits();
  displayScore();
  displayLives();
  displayWorld();
}

function setToCherry(val){
  if (random(1, 100) <= cherryChance && val == 1){
    return 3;
  }
  else {
    return val;
  }
}

//goes through the whole world and does something to each cell
function iterateThroughWorld(cb){
  for (var i = 0; i < world.length; i++){
    for (var j = 0; j < world[i].length; j++){
      world[i][j] = cb(world[i][j]);
    }
  }
}

function random(a, b){
  return Math.floor(Math.random()*(b-a+1))+a;
}

function face(unit, direction){
  switch (direction) {
    case "right":
    unit.angle = 0;
    break;
    case "left":
    unit.angle = 180;
    break;
    case "up":
    unit.angle = -90;
    break;
    case "down":
    unit.angle = 90;
    break;
    default:
    unit.angle = 0;
  }
}

function updateWorld(){
  switch (world[pacman.y][pacman.x]) {
    case 1:
    score += 10;
    world[pacman.y][pacman.x] = 0;
    collected_coin_cherry++;
    break;
    case 3:
    score += 50;
    world[pacman.y][pacman.x] = 0;
    collected_coin_cherry++;
    break;
    default:
    break;
  }
  world[pacman.y][pacman.x] = 0;
  displayWorld();
  displayAllUnits();
}

initWorld();

//move a unit in the specified direction
function move(unit, direction){
  face(unit, direction);
  if (!wallCollisionCheck(unit, direction)){
    switch (direction) {
      case "right":
      unit.x++;
      break;
      case "left":
      unit.x--;
      break;
      case "up":
      unit.y--;
      break;
      case "down":
      unit.y++;
      break;
      default:
      break;
    }
  }
}

//check if the unit is currently occupying the same space (not just colliding with) as another unit
function unitCollisionCheck(unit1, unit2){
  if (unit1.x == unit2.x && unit1.y == unit2.y){ //this is simplistic, but the units should move in discrete units, so it should work
    return true;
  }
  return false;
}

//returns true if the unit is next to a wall in the target direction
function wallCollisionCheck(unit, direction){
  if(direction == "right" && world[unit.y][unit.x+1] == 2){
    return true;
  }
  else if(direction == "left" && world[unit.y][unit.x-1] == 2){
    return true;
  }
  else if(direction == "up" && world[unit.y-1][unit.x] == 2){
    return true;
  }
  else if(direction == "down" && world[unit.y+1][unit.x] == 2){
    return true;
  }
  return false;
}

function randomMove(unit){
  let randir = random(1,4);
  switch (randir) {
    case 1:
    move(unit,"right");
    break;
    case 2:
    move(unit,"left");
    break;
    case 3:
    move(unit,"up");
    break;
    case 4:
    move(unit,"down");
    break;
    default:
    break;
  }
}

document.onkeydown = function(e){
  if(e.keyCode == 37){
    move(pacman, "left");
  }
  else if (e.keyCode == 39){
    move(pacman, "right");
  }
  else if (e.keyCode == 38){
    move(pacman, "up");
  }
  else if (e.keyCode == 40){
    move(pacman, "down");
  }

  //loss condition
  if (unitCollisionCheck(pacman, orange_ghost) || unitCollisionCheck(pacman, blue_ghost)){
    lives--;
    displayLives();
    alert("you lost!");
  }

  //win condition
  if (collected_coin_cherry == total_coin_cherry){
    alert("you won!");
  }

  randomMove(orange_ghost);
  console.log(orange_ghost);
  randomMove(blue_ghost);

  updateWorld();
  displayUnit(pacman);
  displayScore();
  displayLives();
}
