window.onload = init();

function init() {
  var game = newGame();
  var gameGrid = document.getElementById('gameGrid');
  game.grid = initializeGrid(game.grid);
  game.grid = addShipsToGrid(game.playerShips, game.grid);
  gameGrid.innerHTML = displayGrid(game.grid);
  handleCellClick(game.grid);
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

function handleCellClick(grid) {
  var cells = document.getElementsByTagName('td');
  for (var i = 0; i < cells.length; i++) {
    cells[i].onclick = function() {
      // Subtract 1 from col and row variables to account for the table headings
      var col = this.cellIndex - 1;
      var row = this.parentNode.rowIndex - 1;
      console.log(grid[col][row]);
      // Change cell here
    }
  }
}
