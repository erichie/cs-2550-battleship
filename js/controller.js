window.onload = init();

function init()
{
  // Initialize game Model and load computer ships
  // moveLegend();
  displayName();
  var game = newGame();
  var turn = -1;
  var gameGrid = document.getElementById('playerGrid');
  var computerGrid = document.getElementById('computerGrid');
  var json = loadSampleJSON('config.json');
  game.computerShips = loadComputerConfig(json, game.computerShips);

  // Initialize player grid
  game.grid = initializeGrid(game.grid);
  game.grid = addShipsToGrid(game.playerShips, game.grid, true);
  gameGrid.innerHTML = displayGrid(game.grid);

  // Initialize computer grid
  game.computerGrid = initializeGrid(game.computerGrid);
  game.computerGrid = addShipsToGrid(game.computerShips, game.computerGrid, false);
  computerGrid.innerHTML = displayGrid(game.computerGrid);

  // Handle the placement of the player's ships on the player grid
  game.grid = handleShipPlacement(game.grid, game.playerShips);

  // Save and Load game data
  var loadGameButton = document.getElementById('load-game');
  loadGameButton.onclick = function() {
    var saveGame = loadSaveGame();
    game.grid = addShipsToGrid(saveGame.playerShips, game.grid, true);
    game.playerShips = saveGame.playerShips;
    gameGrid.innerHTML = displayGrid(game.grid);
  }
  var saveGameButton = document.getElementById('save-game');
  saveGameButton.onclick = function() {
    saveGame(game);
    return false;
  }
  var clearStorage = document.getElementById('clear-storage');
  clearStorage.onclick = function() {
    clearLocalStorage();
    return false;
  }

  var startGameButton = document.getElementById('start-game');
  startGameButton.onclick = function() {
    if (game.playerShips.placedCount == 5) {
      computerAttack(game.grid, game.playerShips);
      startGameButton.innerHTML = 'End Turn';
      playerAttack(game.computerGrid, game.computerShips);
      document.getElementById('start-game-message').innerHTML = 'It is now your turn. Make a guess and then click "End Turn"';
    }
    else {
      document.getElementById('start-game-message').innerHTML = 'You must place all your ships before you can play.';
    }
  }
}

function handleLogin()
{
  var loginButton = document.getElementById('login-button');
  var ajax = new XMLHttpRequest();
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value
  var data = 'userName=' + username + '&password=' + password;
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4) {
      var response = JSON.parse(ajax.responseText);
      if (response.result == 'valid') {
        var timestamp = 'User: ' + username + ' ' + response.timestamp;
        localStorage.setItem('cs2550timestamp', timestamp);
        window.location = 'grid.html';
      }
      else {
        document.getElementById('home-message').innerHTML = '<h3>Invalid Login Credentials</h3>';
      }
    }
  }
  ajax.open('POST', 'http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php', true);
  ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  ajax.send(data);
}

function saveGame(game) {
  var message = document.getElementById('save-game-message').innerHTML = 'Your game was successfully saved!';
  var gameData = JSON.stringify(game);
  localStorage.setItem('save-game', gameData);
}

function loadSaveGame()
{
  var message = document.getElementById('save-game-message').innerHTML = 'Your game was successfully loaded!';
  var saveGame = localStorage.getItem('save-game');
  return JSON.parse(saveGame);
}

function clearLocalStorage()
{
  var message = document.getElementById('save-game-message').innerHTML = 'Your save game data was successfully cleared!';
  localStorage.removeItem('save-game');
  init();
}

function playerAttack(grid, computerShips)
{
  var computerGrid = document.getElementById('computerGrid');
  var cells = document.getElementsByTagName('td');
  for (var i = 0; i < cells.length; i++) {
    cells[i].onclick = function() {
      document.getElementById('start-game-message').innerHTML = '';
      var message = document.getElementById('message');
      var cellAction = '';
      var col = this.cellIndex;
      var row = this.parentNode.rowIndex;
      var cell = computerGrid.rows[row].cells[col];
      if (cell.className === 'hidden-ship') {
        cellAction = 'hit!';
        updatedGrid = markHit(row - 1, col - 1, grid);
        computerGrid.innerHTML = displayGrid(updatedGrid);
      }
      else {
        if (cell.className !== 'hit') {
          cellAction = 'miss!';
          updatedGrid = markMiss(row - 1, col - 1, grid);
          computerGrid.innerHTML = displayGrid(updatedGrid);
        }
      }
      message.innerHTML = 'Cell: ' + String.fromCharCode(65 + (col - 1))  + ' ' + row + ' was a ' + cellAction;
    }
  }
}

function computerAttack(grid, playerShips)
{
  var row = Math.floor((Math.random() * 10) + 1);
  var col = Math.floor((Math.random() * 10) + 1);
  var playerGrid = document.getElementById('playerGrid');
  var cell = playerGrid.rows[row].cells[col];
  if (cell.className === 'ship') {
    updatedGrid = markHit(row - 1, col - 1, grid);
    playerGrid.innerHTML = displayGrid(updatedGrid);
  }
  else {
    if (cell.className === 'miss' || cell.className === 'hit') {
      computerAttack(grid);
    }
    if (cell.className !== 'hit') {
      updatedGrid = markMiss(row - 1, col - 1, grid);
      playerGrid.innerHTML = displayGrid(updatedGrid);
    }
  }
}

function loadSampleJSON(filename)
{
  var httpRequest = new XMLHttpRequest();
  httpRequest.open('GET', filename, false);
  httpRequest.send();
  var response = JSON.parse(httpRequest.responseText);
  return response;
}

function loadComputerConfig(json, computerShips)
{
  var shipConfig = Math.floor((Math.random() * 5) + 1);
  var i = 0;
  for (var key in computerShips) {
    computerShips[key].shipLocation = json.computer_config[shipConfig].ships[i];
    i++;
  }
  return computerShips;
}

function initializeGrid(grid)
{
  for (var h = 0; h < grid.length; h++) {
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; i < grid.length; i++) {
        grid[i][h] = '<td></td>';
      }
    }
  }
  return grid;
}

function addShipsToGrid(ships, grid, player)
{
  for (var key in ships) {
    for (var a in ships[key].shipLocation) {
      var location = ships[key].shipLocation[a];
      if (player == true) {
        grid[location.x][location.y] = '<td class="ship"></td>';
      }
      else {
        grid[location.x][location.y] = '<td class="hidden-ship"></td>';
      }
    }
  }
  return grid;
}

function handleShipPlacement(grid, playerShips)
{
  var placeButton = document.getElementById('place-button');
  placeButton.onclick = function() {
    var updatedShips = placeShip(playerShips);
    grid = addShipsToGrid(updatedShips, grid, true);
    var gameGrid = document.getElementById('playerGrid');
    gameGrid.innerHTML = displayGrid(grid);
    return grid;
  }
  return grid;
}
