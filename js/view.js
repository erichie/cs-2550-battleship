window.onload = init();

function init() {
  displayName();
  var game = newGame();
  var gameGrid = document.getElementById('gameGrid');
  game.grid = initializeGrid(game.grid);
  game.grid = addShipsToGrid(game.playerShips, game.grid);
  gameGrid.innerHTML = displayGrid(game.grid);
  game.grid = handleShipPlacement(game.grid, game.playerShips);
  handleCellClick();
}

function initializeGrid(grid) {
  for (var h = 0; h < grid.length; h++) {
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; i < grid.length; i++) {
        grid[i][h] = '<td></td>';
      }
    }
  }
  return grid;
}

function addShipsToGrid(ships, grid) {
  for (var key in ships) {
    for (var a in ships[key].shipLocation) {
      var location = ships[key].shipLocation[a];
      grid[location.x][location.y] = '<td class="ship"></td>';
    }
  }
  return grid;
}

function displayGrid(grid) {
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

function handleCellClick() {
  var gameGrid = document.getElementById('gameGrid');
  var cells = document.getElementsByTagName('td');
  for (var i = 0; i < cells.length; i++) {
    cells[i].onclick = function() {
      var message = document.getElementById('message');
      var cellAction = '';
      var col = this.cellIndex;
      var row = this.parentNode.rowIndex;
      var cell = gameGrid.rows[row].cells[col];
      if (cell.className === 'ship') {
        cell.className = 'hit';
        cellAction = 'hit!';
      }
      else {
        if (cell.className !== 'hit') {
          cell.className = 'miss';
          cellAction = 'miss.';
        }
      }
      message.innerHTML = 'Cell: ' + String.fromCharCode(65 + (col - 1))  + ' ' + row + ' was a ' + cellAction;
    }
  }
}

function handleShipPlacement(grid, playerShips)
{
  var placeButton = document.getElementById('place-button');
  placeButton.onclick = function() {
    var updatedShips = placeShip(playerShips);
    grid = addShipsToGrid(updatedShips, grid);
    var gameGrid = document.getElementById('gameGrid');
    gameGrid.innerHTML = displayGrid(grid);
    handleCellClick();
    return grid;
  }
}

function displayName()
{
  var playerName = document.getElementById('player-name');
  var nameInput = document.getElementById('name-input');
  nameInput.oninput = function() {
    playerName.innerHTML = 'Name: ' + this.value;
  }
}
