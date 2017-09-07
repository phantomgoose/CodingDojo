/*
1) display hero
2) make the hero move
3) display the enemies
4) make eneies move
5) shoot bullets on spacebar
*/
var hero = {
  x: 300,
  y: 400
}

var score = 0;

var enemies = [{x: 50, y: 50, type: "enemy1", id: 0},{x: 250, y:50, type:"enemy1", id: 1},{x: 450, y:250, type:"enemy1", id: 2},{x: 550, y:250, type:"enemy1", id: 3},{x: 150, y: 500, type:"enemy2", id: 4},{x: 50, y: 500, type:"enemy2", id: 5},{x: 350, y: 150, type:"enemy2", id: 6}];

var idCounter = 6;

var bullets = [];

function displayHero(){
  document.getElementById("hero").style["top"] = hero.y + "px";
  document.getElementById("hero").style["left"] = hero.x + "px";
}

function displayScore(){
  document.getElementById("score").innerHTML = score;
}

function displayEnemies(){
  var output = "";
  for (var i = 0; i < enemies.length; i++){
    output += "<div class='" + enemies[i].type + "' id='enemy" + enemies[i].id + "' style='top:" + enemies[i].y + "px; left:" + enemies[i].x + "px;'></div>";
  }
  document.getElementById("enemies").innerHTML = output;
}

function moveEnemies(){
  for (var i = 0; i < enemies.length; i++){
    enemies[i].y += 5;

    if(enemies[i].y > 536){
      enemies[i].y = 0;
      enemies[i].x = Math.random()*500;
    }
  }
}

function displayBullets(){
  var output = "";
  for (var i = 0; i < bullets.length; i++){
    output += "<div class='bullet' style='top:" + bullets[i].y + "px; left:" + bullets[i].x + "px;'></div>";
  }
  document.getElementById("bullets").innerHTML = output;
}

function moveBullets(){
  for (var i = 0; i < bullets.length; i++){
    bullets[i].y -= 5;
    if(bullets[i].y < -18){
      bullets.splice(i, 1);
    }
  }
}

function detectBulletHit(){
  for (var i = 0; i < bullets.length; i++){
    for (var j = 0; j < enemies.length; j++){
      if (bullets[i] !== undefined && enemies[j] !== undefined && Math.abs(bullets[i].x-enemies[j].x) < 28 && Math.abs(bullets[i].y-enemies[j].y) < 28){
        score += 10;
        explodePlane(enemies[j]);
        enemies.splice(j, 1);
        bullets.splice(i, 1);
      }
    }
  }
}

function explodePlane(plane){
  document.getElementById("enemy" + plane.id).className = "explosion";
  var audio = new Audio('explosion.mp3');
  audio.play();
}

function detectPlaneHit(){
  for (var i = 0; i < enemies.length; i++){
    if (Math.abs(hero.x-enemies[i].x) < 28 && Math.abs(hero.y-enemies[i].y) < 28){
      score -= 500;
      explodePlane(enemies[i]);
      enemies.splice(i, 1);
    }
  }
}

function gameLoop(){
  displayHero();
  moveBullets();
  displayBullets();
  moveEnemies();
  displayEnemies();
  detectBulletHit();
  detectPlaneHit();
  displayScore();

  //if there are less than 3 enemies remaining, spawn some more
  if (enemies.length < 3){
    for (var i = 1; i <= Math.random()*3+3; i++){
      idCounter++;
      enemies.push({x: Math.random()*500, y: 50, type: "enemy" + Math.floor(Math.random()+1), id: idCounter});
    }
  }
}

setInterval(gameLoop, 20);

document.onkeydown = function(e){
  if (e.keyCode == 65) {
    hero.x -= 14;
  } else if (e.keyCode == 68){
    hero.x += 14;
  } else if (e.keyCode == 87){
    hero.y -= 14;
  } else if (e.keyCode == 83){
    hero.y += 14;
  } else if (e.keyCode == 32){
    bullets.push({x: hero.x+5, y: hero.y-5});
  }
}
