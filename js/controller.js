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
        document.getElementById('message').innerHTML = '<h3>Invalid Login Credentials</h3>';
      }
    }
  }
  ajax.open('POST', 'http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php', true);
  ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  ajax.send(data);
}

function retrieveUserInfo()
{
  var userInfo = localStorage.getItem('cs2550timestamp');
  return userInfo;
}

function clearLocalStorage()
{
  localStorage.removeItem('cs2550timestamp');
  document.getElementById('user-info').innerHTML = '';
}

function playerAttack() {

}

function computerAttack() {

}
