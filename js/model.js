function newGame() {
  var game = generateAndPlaceShips();
  return game;
}

// Objects
function Game(grid, playerShips, computerShips, playerGuesses, computerGuesses) {
  this.grid = grid;
  this.playerShips = playerShips;
  this.computerShips = computerShips;
  this.playerGuesses = playerGuesses;
  this.computerGuesses = computerGuesses;
}

function PlayerShips() {
  this.playerCarrier;
  this.playerBattleship;
  this.playerCruiser;
  this.playerSub;
  this.playerDestroyer;
}

function ComputerShips() {
  this.computerCarrier;
  this.computerBattleship;
  this.computerCruiser;
  this.computerSub;
  this.computerDestroyer;
}

function Ship(size, location) {
  this.shipSize = size;
  this.shipLocation = location;
  this.sunk = false;
  this.hits = 0;
}

// Functions
function generateAndPlaceShips() {
  var grid = createGridArray(10, 10);
  var playerShips = new PlayerShips();
  var computerShips = new ComputerShips();
  var playerGuesses = new Array();
  var computerGuesses = new Array();

  // Generates Player ships
  playerShips.playerCarrier = new Ship(5, [{'x':0, 'y':1}, {'x':0, 'y':2}, {'x':0, 'y':3}, {'x':0, 'y':4}, {'x':0, 'y':5}]);
  playerShips.playerBattleship = new Ship(4, [{'x':3, 'y':2}, {'x':4, 'y':2}, {'x':5, 'y':2}, {'x':6, 'y':2}]);
  playerShips.playerCruiser = new Ship(3, [{'x':9, 'y':7}, {'x':9, 'y':8}, {'x':9, 'y':9}]);
  playerShips.playerSub = new Ship(3, [{'x':4, 'y':4}, {'x':4, 'y':5}, {'x':4, 'y':6}]);
  playerShips.playerDestroyer = new Ship(2, [{'x':5, 'y':8}, {'x':6, 'y':8}]);

  // Generates Computer ships
  computerShips.computerCarrier = new Ship(5, [{'x':1, 'y':1}, {'x':1, 'y':2}, {'x':1, 'y':3}, {'x':1, 'y':4}, {'x':1, 'y':5}]);
  computerShips.computerBattleship = new Ship(4, [{'x':3, 'y':9}, {'x':4, 'y':9}, {'x':5, 'y':9}, {'x':6, 'y':9}]);
  computerShips.computerCruiser = new Ship(3, [{'x':5, 'y':5}, {'x':5, 'y':6}, {'x':5, 'y':7}]);
  computerShips.computerSub = new Ship(3, [{'x':7, 'y':4}, {'x':8, 'y':4}, {'x':9, 'y':4}]);
  computerShips.computerDestroyer = new Ship(2, [{'x':3, 'y':1}, {'x':3, 'y':2}]);

  var game = new Game(grid, playerShips, computerShips, playerGuesses, computerGuesses);
  return game;
}

function createGridArray(x, y) {
  var grid = new Array();
  for (var i = 0; i < x; i++) {
    grid[i] = new Array();
    for (var j = 0; j < y; j++) {
      grid[i][j] = '';
    }
  }
  return grid;
}

// Implement these functions later on to update the Model
function placeShip() {
  var ship = document.getElementById('ship');
  var row = document.getElementById('row');
  var col = document.getElementById('col');
  var placeButton = document.getElementById('place-button');
  placeButton.onclick = function() {
    console.log(row.value);
    console.log(col.value);
    console.log(ship.value)
  }
}

function markHit() {

}

function markMiss() {

}

function markSunk() {

}

function playerAttack() {

}

function computerAttack() {

}
