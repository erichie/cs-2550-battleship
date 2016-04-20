window.onload = init();

function init()
{
  // Initialize game Model and load computer ships
  // moveLegend();
  displayName();
  var game = newGame();
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

  // Make the computer grid clickable so the player can attack
  handleCellClick();

  // Save and Load game data
  var loadGameButton = document.getElementById('load-game');
  loadGameButton.onclick = function() {
    var saveGame = loadSaveGame();
    game.grid = addShipsToGrid(saveGame.playerShips, game.grid, true);
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
}

function displayGrid(grid)
{
  var html = '';
  for (var i = -1; i < grid.length; i++) {
    if (i == -1) {
      html += '<tr><th></th>';
    }
    else {
      html += '</tr><tr><th>' + (i + 1) + '</th>';
    }
    for (var j = 0; j < grid.length; j++) {
      if (i == -1) {
        html += '<th>' + String.fromCharCode(65 + j); + '</th></tr>';
      }
      else {
        html += grid[j][i];
      }
    }
  }
  return html;
}

function displayName()
{
  var playerName = document.getElementById('player-name');
  var nameInput = document.getElementById('name-input');
  nameInput.oninput = function() {
    playerName.innerHTML = 'Name: ' + this.value;
  }
}

function moveLegend()
{
  var legend = document.getElementById('legendTable');
  var id = setInterval(move, 10)
  var position = 500;
  function move() {
    if (position !== 0) {
      position--;
      legend.style.top = position + 'px';
    }
  }
}
