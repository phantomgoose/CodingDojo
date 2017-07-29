// premade world
// var world = [
//   [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
//   [2,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
//   [2,1,1,1,1,1,2,2,1,2,2,2,2,2,2,2,1,1,2,2],
//   [2,1,2,1,1,1,2,2,1,2,2,2,1,1,1,1,1,1,1,2],
//   [2,1,2,1,2,2,2,2,1,2,2,2,1,2,2,2,2,2,1,2],
//   [2,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,2,1,2],
//   [2,1,2,1,2,2,2,2,2,2,2,1,2,2,2,2,1,2,1,2],
//   [2,1,2,1,2,2,2,2,2,2,2,1,2,1,1,2,1,2,1,2],
//   [2,1,1,1,2,2,2,1,1,1,1,1,2,2,1,1,1,1,1,2],
//   [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
// ];

var world = [];
//this world can be navigated
var navWorld = [];
var validCellCounter = 0;

//checking if the maze is viable
function checkMaze(width, height){
  let totalMazeRows = height-2; //total playable rows, -2 for borders
  let totalMazeColumns = width-2; //same as above
  let numEvenRows = Math.floor(totalMazeRows / 2);
  let numOddRows = totalMazeRows - numEvenRows;
  let maxMazeLength = numOddRows * totalMazeColumns + numEvenRows; //maximum number of cells that can fit in the playable field in a snake-like pattern (with a partial wall every other row)

  //checking how many traversible cells our random world has and add traversible cells to the navWorld array
  for (let row = 0; row < height; row++){
    for (let column = 0; column < width; column++){
      if (world[row][column] != 2){
        validCellCounter++;
        navWorld[row][column] = 1;
      }
    }
  }

  //if the number of valid cells is less than 100% of the maximum, reroll the world
  if (validCellCounter < maxMazeLength){
    console.log("not a good enough world, creating new one");
    seedWorld(width, height);
  }
}

function canMove(unit){ //at all
  if (wallCollisionCheck(unit, "right") && wallCollisionCheck(unit, "left") && wallCollisionCheck(unit, "up") && wallCollisionCheck(unit, "down")){
    return false;
  }
  return true;
}

function seedWorld(width, height){
  world = [];
  navWorld = [];
  validCellCounter = 0;

  //create empty (zero/empty block) world and navworld arrays of the right size
  for (let row = 0; row < height; row++){
    world.push([]);
    navWorld.push([]);
    for (let column = 0; column < width; column++){
      world[row].push(0);
      navWorld[row].push(0);
    }
  }

  //borders
  for (let column = 0; column < width; column++){
    world[0][column] = 2;
  }
  for (let column = 0; column < width; column++){
    world[height-1][column] = 2;
  }
  for (let row = 0; row < height; row++){
    world[row][0] = 2;
  }
  for (let row = 0; row < height; row++){
    world[row][width-1] = 2;
  }

  //rest of the cells
  for (var row = 1; row < height-1; row++){
    for (var column = 1; column < width-1; column++){
      world[row][column] = random(1,2);
    }
  }

  checkMaze(width, height);
}

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

var mazeWalker = {
  x: 0,
  y: 0,
  angle: 0,
  lastTurn: "left"
}

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
  seedWorld(20, 20);
  iterateThroughWorld(setToCherry);

  for (row in world){
    for (column in world[row]){
      if (world[row][column] == 1 || world[row][column] == 3){
        total_coin_cherry++;
      }
    }
  }

  //spawn ghosts and pacnman on valid cells
  //get a random number from 1 to total number of valid cells, so that we can spawn the units there
  let blueStartPos = 1;
  let orangeStartPos = 1;
  let pacmanStartPos = 1;
  //if we roll the same cell for any two units, keep rerolling the spawn locations
  while ((blueStartPos == orangeStartPos || blueStartPos == pacmanStartPos || orangeStartPos == pacmanStartPos) && validCellCounter > 2){
    orangeStartPos = random(1, validCellCounter);
    blueStartPos = random(1, validCellCounter);
    pacmanStartPos = random(1, validCellCounter);
  }
  //actually spawn our units in the right spots
  let counter = 0;
  for (let row = 0; row < navWorld.length; row++){
    for (let column = 0; column < navWorld[row].length; column++){
      if (navWorld[row][column] == 1){
        counter++;
        switch (counter) {
          case blueStartPos:
          blue_ghost.x = column;
          blue_ghost.y = row;
          break;
          case orangeStartPos:
          orange_ghost.x = column;
          orange_ghost.y = row;
          break;
          case pacmanStartPos:
          pacman.x = column;
          pacman.y = row;
          break;
          default:
          break;
        }
      }
    }
  }

  //clear cell where pacman spawns
  world[pacman.y][pacman.x] = 0;

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
  if (unit1.x == unit2.x && unit1.y == unit2.y){
    return true;
  }
  return false;
}

//returns true if the unit is next to a wall in the target direction
function wallCollisionCheck(unit, direction){
  if(direction == "right"){
    let temp = unit.x + 1;
    if (world[unit.y][unit.x+1] == 2){
      return true;
    }
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
  if (canMove(unit)){
    let randir = random(1,4);
    switch (randir) {
      case 1:
      if (!wallCollisionCheck(unit, "right")){
        move(unit,"right");
      } else {
        randomMove(unit);
      }
      break;
      case 2:
      if (!wallCollisionCheck(unit, "left")){
        move(unit,"left");
      } else {
        randomMove(unit);
      }
      break;
      case 3:
      if (!wallCollisionCheck(unit, "up")){
        move(unit,"up");
      } else {
        randomMove(unit);
      }
      break;
      case 4:
      if (!wallCollisionCheck(unit, "down")){
        move(unit,"down");
      } else {
        randomMove(unit);
      }
      break;
      default:
      break;
    }
  }
}

//loss condition
function checkForLoss(){
  if (unitCollisionCheck(pacman, orange_ghost) || unitCollisionCheck(pacman, blue_ghost)){
    pacman.lives--;
    updateWorld();
    displayLives();
    alert("you lost!");
    return true;
  }
  return false;
}

document.onkeydown = function(e){
  //can only play if you have lives
  if (pacman.lives > 0){
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
    else {
      return; // do nothing if some other button was pressed
    }

    displayScore();
    updateWorld();
    //dont move ghosts in case of loss
    if (checkForLoss()){
      return;
    }

    randomMove(orange_ghost);
    randomMove(blue_ghost);
    updateWorld();
    checkForLoss();

    //win condition
    if (collected_coin_cherry == total_coin_cherry){
      alert("you won!");
    }
  }
}
