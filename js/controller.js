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

function playerAttack()
{

}

function computerAttack()
{

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

function handleCellClick()
{
  var gameGrid = document.getElementById('computerGrid');
  var cells = document.getElementsByTagName('td');
  for (var i = 0; i < cells.length; i++) {
    cells[i].onclick = function() {
      var message = document.getElementById('message');
      var cellAction = '';
      var col = this.cellIndex;
      var row = this.parentNode.rowIndex;
      var cell = gameGrid.rows[row].cells[col];
      if (cell.className === 'hidden-ship') {
        cell.className = 'hit';
        cell.innerHTML = '<b>HIT</b>';
        cellAction = 'hit!';
      }
      else {
        if (cell.className !== 'hit') {
          cell.className = 'miss';
          cell.innerHTML = '<b>MISS</b>';
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
    grid = addShipsToGrid(updatedShips, grid, true);
    var gameGrid = document.getElementById('playerGrid');
    gameGrid.innerHTML = displayGrid(grid);
    handleCellClick();
    return grid;
  }
  return grid;
}
